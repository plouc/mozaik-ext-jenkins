import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import moment                          from 'moment';


class JobBuild extends Component {
    render() {
        const { build } = this.props;

        const classes = `list__item list__item--with-status list__item--with-status--${ build.result.toLowerCase() }`;

        return (
            <div className={classes}>
                #{build.number} {build.result}&nbsp;
                <time className="list__item__time">
                    <i className="fa fa-clock-o" />&nbsp;
                    {moment(build.timestamp, 'x').fromNow()}
                </time>
            </div>
        );
    }
}

JobBuild.displayName = 'JobBuild';

JobBuild.propTypes = {
    build: PropTypes.shape({
        number:    PropTypes.number.isRequired,
        result:    PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired
    }).isRequired
};


export default JobBuild;
