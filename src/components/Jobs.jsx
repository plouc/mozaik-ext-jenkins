import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import reactMixin           from 'react-mixin';
import { ListenerMixin }    from 'reflux';
import Mozaik               from 'mozaik/browser';
import JobItem              from './JobItem.jsx';


class Jobs extends Component {
    constructor(props) {
        super(props);

        this.state = { jobs: [] };
    }

    getApiRequest() {
        return { id: 'jenkins.jobs' };
    }

    onApiData(jobs) {
        this.setState({ jobs });
    }

    render() {
        const { jobs } = this.state;

        return (
            <div>
                <div className="widget__header">
                    Jenkins jobs
                    <span className="widget__header__count">
                        {jobs.length}
                    </span>
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    {jobs.map((job, index) => (
                        <JobItem key={index} job={job} />
                    ))}
                </div>
            </div>
        );
    }
}

Jobs.displayName = 'Jobs';

reactMixin(Jobs.prototype, ListenerMixin);
reactMixin(Jobs.prototype, Mozaik.Mixin.ApiConsumer);


export default Jobs;
