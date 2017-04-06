import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import moment                          from 'moment';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';
import { getBuildStatus }              from './util';
import compact                         from 'lodash/compact';

class JobStatusProgress extends Component {

    constructor(props) {
        super(props);

        this.state = { previousBuild: {}, currentBuild: {} };
    }

    getApiRequest() {
        const { job } = this.props;

        return {
            id:     `jenkins.job.${job}`,
            params: { job }
        };
    }

    onApiData(builds) {
        const [currentBuild = {}, previousBuild = {}] = builds;
        this.setState({ currentBuild, previousBuild });
    }

    render() {
        const { job } = this.props;
        const { currentBuild, previousBuild } = this.state;
        const currentStatus = getBuildStatus(currentBuild);
        const previousStatus = getBuildStatus(previousBuild);
        const title = this.props.title || `Jenkins job ${ job }`;

        const classList = [
            'widget__body__colored',
            `jenkins__view__job__build__colored_status--${ (currentBuild.building ? previousStatus : currentStatus).toLowerCase() }`
        ];

        const iconClassList = [
            'fa',
            currentStatus === 'SUCCESS' && 'fa-check',
            currentStatus === 'FAILURE' && 'fa-close',
            currentStatus === 'UNSTABLE' && 'fa-meh-o',
            currentBuild.building && 'fa-spin fa-cog',
        ];

        const progress = currentBuild.building ?
            ((Date.now() - currentBuild.timestamp) / currentBuild.estimatedDuration) * 100 : 100;

        const progressStyle = {
            border:          '1px solid #000',
            backgroundColor: 'red',
            width:           `${progress}%`
        };

        return (
            <div className={compact(classList).join(' ')}>
                <div className="jenkins__job-status__current">
                    Build #{currentBuild.number}<br />
                    <a className="jenkins__job-status__current__status" href={currentBuild.url}>
                        {title}&nbsp;<br />
                        <i className={compact(iconClassList).join(' ')}/>&nbsp;
                        <span className="jenkins__job-status__current__progress-number">
                            {progress < 100 && `${Math.round(progress)}%`}
                        </span>
                    </a>
                    {progress < 100 && <div className="jenkins__job-status__current__progress-bar" style={progressStyle}/>}
                    <time className="jenkins__job-status__current__time">
                        <i className="fa fa-clock-o"/>&nbsp;
                        {moment(currentBuild.timestamp, 'x').fromNow()}
                    </time>
                </div>
            </div>
        );
    }
}

JobStatusProgress.displayName = 'JobStatusProgress';

JobStatusProgress.propTypes = {
    job:   PropTypes.string.isRequired,
    title: PropTypes.string
};

reactMixin(JobStatusProgress.prototype, ListenerMixin);
reactMixin(JobStatusProgress.prototype, Mozaik.Mixin.ApiConsumer);

export default JobStatusProgress;
