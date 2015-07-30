import React, { Component, PropTypes } from 'react';
import moment                          from 'moment';


class JobBuild extends Component {
    render() {
        let { build } = this.props;

        let classes = `list__item list__item--with-status list__item--with-status--${ build.result.toLowerCase() }`;

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

JobBuild.propTypes = {
    build: PropTypes.object.isRequired
};

export { JobBuild as default };