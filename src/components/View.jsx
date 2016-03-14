import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';
import ViewJobs                        from './ViewJobs.jsx';


class View extends Component {
    constructor(props) {
        super(props);

        this.state = { view: null };
    }

    getApiRequest() {
        const { view } = this.props;

        return {
            id:     `jenkins.view.${view}`,
            params: { view }
        };
    }

    onApiData(view) {
        this.setState({ view });
    }

    render() {
        let titleNode = (
            <span>
                Jenkins <span className="widget__header__subject">{this.props.view}</span> view
            </span>
        );
        if (this.props.title) {
            titleNode = this.props.title;
        }

        let jobsNode = null;
        if (this.state.view) {
            jobsNode = <ViewJobs jobs={this.state.view.jobs} />;
        }

        return (
            <div>
                <div className="widget__header">
                    {titleNode}
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    {jobsNode}
                </div>
            </div>
        );
    }
}

View.displayName = 'View';

View.propTypes = {
    view:  PropTypes.string.isRequired,
    title: PropTypes.string
};

reactMixin(View.prototype, ListenerMixin);
reactMixin(View.prototype, Mozaik.Mixin.ApiConsumer);


export default View;
