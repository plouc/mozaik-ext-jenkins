import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import moment                          from 'moment';
import { getBuildStatus }              from './util';

class JobStatusPreviousBuild extends Component {
    render() {
        const { build } = this.props;

        return (
            <div className="jenkins__job-status__previous">
                previous status (#{build.number}) were&nbsp;
                {getBuildStatus(build)}&nbsp;
                {moment(build.timestamp, 'x').fromNow()}
            </div>
        );
    }
}

JobStatusPreviousBuild.displayName = 'JobStatusPreviousBuild';

JobStatusPreviousBuild.propTypes = {
    build: PropTypes.shape({
        number:    PropTypes.number.isRequired,
        result:    PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired
    }).isRequired
};


export default JobStatusPreviousBuild;
