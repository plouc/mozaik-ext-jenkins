import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';
const { BarChart }                     = Mozaik.Component;


class JobBuildsHistogram extends Component {
    constructor(props) {
        super(props);

        this.state = { builds: [] };
    }

    getApiRequest() {
        const { job } = this.props;

        return {
            id:     `jenkins.job.${ job }`,
            params: { job }
        };
    }

    onApiData(builds) {
        const { cap } = this.props;

        this.setState({ builds: builds.slice(0, cap).reverse() });
    }

    render() {
        const { job }    = this.props;
        const { builds } = this.state;

        // converts to format required by BarChart component
        const data = builds.map(build => ({
            x:      build.number,
            y:      build.duration / 1000 / 60, // converts ms to mn
            result: build.result ? build.result.toLowerCase() : 'unkown'
        }));

        const barChartOptions = {
            mode:            'stacked',
            xLegend:         'build number',
            xLegendPosition: 'right',
            yLegend:         'duration (minutes)',
            yLegendPosition: 'top',
            xPadding:        0.3,
            barClass:        d => `result--${ d.result }`
        };

        return (
            <div>
                <div className="widget__header">
                    Jenkins <span className="widget__header__subject">{job}</span> builds
                    <i className="fa fa-bug"/>
                </div>
                <div className="widget__body">
                    <BarChart data={[{ data: data }]} options={barChartOptions}/>
                </div>
            </div>
        );
    }
}

JobBuildsHistogram.displayName = 'JobBuildsHistogram';

JobBuildsHistogram.propTypes = {
    job: PropTypes.string.isRequired,
    cap: PropTypes.number.isRequired
};

JobBuildsHistogram.defaultProps = {
    cap: 50
};

reactMixin(JobBuildsHistogram.prototype, ListenerMixin);
reactMixin(JobBuildsHistogram.prototype, Mozaik.Mixin.ApiConsumer);

export { JobBuildsHistogram as default };
