import test                 from 'ava';
import React                from 'react';
import { shallow }          from 'enzyme';
import mockery              from 'mockery';
import ViewJobs             from '../../src/components/ViewJobs.jsx';
import ViewJob              from '../../src/components/ViewJob.jsx';
import ViewJobBuildDuration from '../../src/components/ViewJobBuildDuration.jsx';
import ViewJobBuildStatus   from '../../src/components/ViewJobBuildStatus.jsx';
import ViewJobBuildTime     from '../../src/components/ViewJobBuildTime.jsx';
import ViewJobHealthReport  from '../../src/components/ViewJobHealthReport.jsx';



let View;
const sampleView = {
    name: 'sample view',
    jobs: [
        {
            name:         'sample-job-0',
            displayName:  'sample-job-0',
            healthReport: [
                {
                    description: 'Build stability: No recent builds failed.'
                }
            ],
            lastBuild: {
                result: 'SUCCESS'
            }
        },
        {
            name:         'sample-job-1',
            displayName:  'sample-job-1',
            healthReport: [
                {
                    description: 'Build stability: No recent builds failed.'
                }
            ],
            lastBuild: {
                result: 'SUCCESS'
            }
        },
        {
            name:         'sample-job-2',
            displayName:  'sample-job-2',
            healthReport: [
                {
                    description: 'Build stability: No recent builds failed.'
                }
            ],
            lastBuild: {
                result: 'SUCCESS'
            }
        }
    ]
};



test.before('before', t => {
    mockery.enable({
        warnOnUnregistered: false
    });
    mockery.registerMock('mozaik/browser', {
        Mixin: { ApiConsumer: {} }
    });

    View = require('../../src/components/View.jsx').default;
});

test.after('after', t => {
    mockery.deregisterMock('mozaik/browser');
    mockery.disable();
});


test('should return correct api request', t => {
    const wrapper = shallow(<View view={sampleView.name} />);

    t.same(wrapper.instance().getApiRequest(), {
        id:     `jenkins.view.${sampleView.name}`,
        params: { view: sampleView.name }
    });
});

test('should display title containing view name', t => {
    const wrapper = shallow(<View view={sampleView.name} />);

    t.is(wrapper.find('.widget__header').text(), `Jenkins ${sampleView.name} view`);
});

test('should display title override when specified', t => {
    const titleOverride = 'title override';

    const wrapper = shallow(<View view={sampleView.name} title={titleOverride} />);

    t.is(wrapper.find('.widget__header').text(), titleOverride);
});

test('should display job builds detail', t => {
    const wrapper = shallow(<View view={sampleView.name} />);

    wrapper.setState({ view: sampleView });

    t.is(wrapper.find(ViewJobs).length, 1);
    t.is(wrapper.find(ViewJobs).prop('jobs'), sampleView.jobs);
});
