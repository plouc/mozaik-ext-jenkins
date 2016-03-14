import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';
import JobBuild                        from './JobBuild.jsx';


class JobBuilds extends Component {
    constructor(props) {
        super(props);

        this.state = { builds: [] };
    }

    getApiRequest() {
        const { job } = this.props;

        return {
            id:     `jenkins.job.${job} `,
            params: { job }
        };
    }

    onApiData(builds) {
        this.setState({ builds });
    }

    render() {
        const { builds } = this.state;
        const { title }  = this.props;

        return (
            <div>
                <div className="widget__header">
                    {title}
                    <span className="widget__header__count">
                        {builds.length}
                    </span>
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    {builds.map(build => (
                        <JobBuild key={build.number} build={build} />
                    ))}
                </div>
            </div>
        );
    }
}

JobBuilds.displayName = 'JobBuilds';

JobBuilds.propTypes = {
    title: PropTypes.string.isRequired,
    job:   PropTypes.string.isRequired
};

JobBuilds.defaultProps = {
    title: 'Jenkins job builds'
};

reactMixin(JobBuilds.prototype, ListenerMixin);
reactMixin(JobBuilds.prototype, Mozaik.Mixin.ApiConsumer);


export default JobBuilds;
