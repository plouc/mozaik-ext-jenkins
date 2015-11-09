import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser'

const informationUnavailableMessage = "Information Unavailable";

class Coverage extends Component {

    constructor() {
        super();
        this.state = {
            coverage:{
                line: informationUnavailableMessage,
                function: informationUnavailableMessage,
                branch: informationUnavailableMessage
            }
        };
    }

    getApiRequest() {
        return {
            id: 'jenkins.coverage.' + this.props.job,
            params: {
                job: this.props.job,
                reporter: this.props.reporter
            }
        };
    }

    onApiData(coverage) {
        this.setState({
            coverage: {
                function: coverage.function,
                line:  coverage.line,
                branch: coverage.branch
            }
        });
    }

    render() {
        let classes = `list__item`;

        return (
            <div>
                <div className="widget__header">
                    {this.props.title || "Code Coverage"}
                </div>
                <div className={classes}>
                    Line Coverage: {this.state.coverage.line}
                </div>
                <div className={classes}>
                    Function Coverage: {this.state.coverage.function}
                </div>
                <div className={classes}>
                    Branch Coverage: {this.state.coverage.branch}
                </div>


            </div>
        );
    }
}

reactMixin(Coverage.prototype, ListenerMixin);
reactMixin(Coverage.prototype, Mozaik.Mixin.ApiConsumer);

export { Coverage as default };