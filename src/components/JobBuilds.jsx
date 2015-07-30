import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import _                               from 'lodash';
import JobBuild                        from './JobBuild.jsx';
import Mozaik                          from 'mozaik/browser';


class JobBuilds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            builds: []
        };
    }

    getApiRequest() {
        return {
            id:     `jenkins.job.${ this.props.job} `,
            params: {
                job: this.props.job
            }
        };
    }

    onApiData(builds) {
        this.setState({
            builds: builds
        });
    }

    render() {
        var buildNodes = _.map(this.state.builds, build => {
            return (<JobBuild build={build} key={build.number} />);
        });

        return (
            <div>
                <div className="widget__header">
                    {this.props.title || 'Jenkins job build'}
                    <span className="widget__header__count">
                        {this.state.builds.length}
                    </span>
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    {buildNodes}
                </div>
            </div>
        );
    }
}

JobBuilds.propTypes = {
    job: PropTypes.string.isRequired
};

reactMixin(JobBuilds.prototype, ListenerMixin);
reactMixin(JobBuilds.prototype, Mozaik.Mixin.ApiConsumer);

export { JobBuilds as default };
