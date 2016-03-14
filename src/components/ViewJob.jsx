import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import ViewJobBuildStatus              from './ViewJobBuildStatus.jsx';
import ViewJobHealthReport             from './ViewJobHealthReport.jsx';
import ViewJobBuildTime                from './ViewJobBuildTime.jsx';
import ViewJobBuildDuration            from './ViewJobBuildDuration.jsx';


class ViewJob extends Component {
    render() {
        const { job } = this.props;

        return (
            <tr className="table__row">
                <ViewJobBuildStatus build={job.lastBuild} />
                <td className="table__cell">{job.displayName}</td>
                <ViewJobHealthReport job={job} />
                <ViewJobBuildTime build={job.lastSuccessfulBuild} />
                <ViewJobBuildTime build={job.lastFailedBuild} />
                <ViewJobBuildDuration build={job.lastBuild} />
            </tr>
        );
    }
}

ViewJob.displayName = 'ViewJob';

ViewJob.propTypes = {
    job: PropTypes.object.isRequired
};


export default ViewJob;
