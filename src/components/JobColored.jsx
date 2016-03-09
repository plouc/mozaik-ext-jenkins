var React            = require('react');
var Reflux           = require('reflux');
var moment           = require('moment');
var ApiConsumerMixin = require('mozaik/browser').Mixin.ApiConsumer;

var JobColored = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    propTypes: {
        job: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            builds: []
        };
    },

    getApiRequest() {
        return {
            id: 'jenkins.job.' + this.props.job,
            params: {
                job: this.props.job
            }
        };
    },

    onApiData(builds) {
        this.setState({
            builds: builds
        });
    },

    render() {
        var iconClasses  = 'fa fa-close';
        var currentNode  = null;
        var previousNode = null;

        if (this.state.builds.length > 0) {
            var currentBuild = this.state.builds[0];
            if (currentBuild.result === 'SUCCESS') {
                iconClasses = 'fa fa-check';
            }

            var statusClasses = 'widget__body__colored jenkins__view__job__build__colored_status--' + currentBuild.result.toLowerCase();

            currentNode = (
                <div className="jenkins__job-status__current">
                    Build #{currentBuild.number}<br />
                    <span className="jenkins__job-status__current__status">
                        {this.props.title || `${ this.props.job }`}&nbsp;
                        <i className={iconClasses} />
                    </span><br/>
                    <time className="jenkins__job-status__current__time">
                        <i className="fa fa-clock-o" />&nbsp;
                        {moment(currentBuild.timestamp, 'x').fromNow()}
                    </time>
                </div>
            );

        }

        return (
            <div className={statusClasses}>
                {currentNode}
            </div>
        );
    }
});

module.exports = JobColored;
