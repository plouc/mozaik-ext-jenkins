import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars


class ViewJobBuildStatus extends Component {
    render() {
        if (!this.props.build) {
            return (
                <td className="table__cell">
                    <span className="jenkins__view__job__build__status jenkins__view__job__build__status--unknown">
                        <i className="fa fa-question-circle" />
                    </span>
                </td>
            );
        }

        const { build } = this.props;

        let iconClasses = 'fa fa-';
        switch (build.result) {
            case 'SUCCESS':
                iconClasses += 'check-circle';
                break;

            case 'FAILURE':
                iconClasses += 'warning';
                break;

            default:
                iconClasses += 'question-circle';
                break;
        }

        let statusClasses = 'jenkins__view__job__build__status ';
        if (build.result) {
            statusClasses += `jenkins__view__job__build__status--${build.result.toLowerCase()}`;
        }

        return (
            <td className="table__cell">
                <span className={statusClasses}>
                    <i className={iconClasses} />
                </span>
            </td>
        );
    }
}

ViewJobBuildStatus.displayName = 'ViewJobBuildStatus';

ViewJobBuildStatus.propTypes = {
    build: PropTypes.object
};


export default ViewJobBuildStatus;
