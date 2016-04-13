import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import moment                          from 'moment';
import { getBuildStatus }              from './util';


class JobBuild extends Component {
    render() {
        const { build } = this.props;

        const classes = `list__item list__item--with-status list__item--with-status--${ getBuildStatus(build).toLowerCase() }`;

        return (
            <div className={classes}>
                #{build.number} {getBuildStatus(build)}&nbsp;
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
        building:  PropTypes.bool.isRequired,
        number:    PropTypes.number.isRequired,
        result:    PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired
    }).isRequired
};


export default JobBuild;
