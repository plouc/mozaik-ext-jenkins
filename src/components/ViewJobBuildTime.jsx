import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import moment                          from 'moment';


class ViewJobBuildTime extends Component {
    render() {
        if (!this.props.build) {
            return <td className="table__cell">n/a</td>;
        }

        const { build } = this.props;

        return (
            <td className="table__cell">
                {moment(build.timestamp, 'x').fromNow()}
            </td>
        );
    }
}

ViewJobBuildTime.displayName = 'ViewJobBuildTime';

ViewJobBuildTime.propTypes = {
    build: PropTypes.object
};


export default ViewJobBuildTime;
