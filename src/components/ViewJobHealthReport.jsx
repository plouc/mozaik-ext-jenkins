import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars


class ViewJobHealthReport extends Component {
    render() {
        const { job } = this.props;

        if (job.healthReport.length === 0) {
            return <td className="table__cell">n/a</td>;
        }

        return <td className="table__cell">{job.healthReport[0].description}</td>;
    }
}

ViewJobHealthReport.displayName = 'ViewJobHealthReport';

ViewJobHealthReport.propTypes = {
    job: PropTypes.object.isRequired
};


export default ViewJobHealthReport;
