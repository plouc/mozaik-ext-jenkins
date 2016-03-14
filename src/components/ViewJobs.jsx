import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import ViewJob                         from './ViewJob.jsx';

class ViewJobs extends Component {
    render() {
        const { jobs } = this.props;

        return (
            <table className="table">
                <thead>
                    <tr className="table__row table__row--head">
                        <th className="table__cell table__cell--head" />
                        <th className="table__cell table__cell--head">job</th>
                        <th className="table__cell table__cell--head">health</th>
                        <th className="table__cell table__cell--head">last success</th>
                        <th className="table__cell table__cell--head">last fail</th>
                        <th className="table__cell table__cell--head">last duration</th>
                    </tr>
                </thead>
                {jobs.map(job => (
                    <ViewJob key={job.name} job={job} />
                ))}
            </table>
        );
    }
}

ViewJobs.displayName = 'ViewJobs';

ViewJobs.propTypes = {
    jobs: PropTypes.array.isRequired
};


export default ViewJobs;
