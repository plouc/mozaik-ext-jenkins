import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import moment                          from 'moment';
require('moment-duration-format');


class ViewJobBuildDuration extends Component {
    render() {
        if (!this.props.build) {
            return <td className="table__cell">n/a</td>;
        }

        const { build } = this.props;

        return (
            <td className="table__cell">
                { moment.duration(build.duration, 'ms').format('m [mn] s [s]')}
            </td>
        );
    }
}

ViewJobBuildDuration.displayName = 'ViewJobBuildDuration';

ViewJobBuildDuration.propTypes = {
    build: PropTypes.object
};


export default ViewJobBuildDuration;
