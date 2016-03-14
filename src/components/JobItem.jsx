import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import moment                          from 'moment';


class JobItem extends Component {
    render() {
        const { job } = this.props;

        let buildNumber = <span>—</span>;
        let statusIcon  = <i className="fa fa-question-circle" />;  // eslint-disable-line no-unused-vars
        let fromNow     = <time>—</time>;

        if (job.lastBuild) {
            buildNumber = (
                <span className="jenkins__job__number">
                    #{job.lastBuild.number}
                </span>
            );

            if (job.lastBuild.result === 'SUCCESS') {
                statusIcon = <i className="fa fa-check-circle" />;
            } else if (job.lastBuild.result === 'FAILURE') {
                statusIcon = <i className="fa fa-times-circle" />;
            } else if (job.lastBuild.result === 'ABORTED') {
                statusIcon = <i className="fa fa-minus-circle" />;
            }

            fromNow = <time>{moment(job.lastBuild.timestamp).fromNow()}</time>;
        }

        const classes = `jenkins__job jenkins__job--${job.lastBuild ? job.lastBuild.result.toLowerCase() : 'unknown'}`;

        return (
            <div className={classes}>
                {job.name} {buildNumber}<br />
                {fromNow}
            </div>
        );
    }
}

JobItem.displayName = 'JobItem';

JobItem.propTypes = {
    job: PropTypes.object.isRequired
};


export default JobItem;
