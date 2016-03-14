/* global describe it */
import React       from 'react';
import { shallow } from 'enzyme';
import expect      from 'expect';
import JobItem     from '../../components/JobItem.jsx';


describe('<JobItem />', () => {
    it('should display job name and number', () => {
        const job = {
            name:      'test job',
            lastBuild: {
                number:    13,
                result:    'SUCCESS',
                timestamp: 1457624704782
            }
        };
        const wrapper = shallow(
            <JobItem job={job} />
        );

        expect(wrapper.prop('className')).toContain('jenkins__job--success');
        expect(wrapper.text()).toContain(`${job.name} #${job.lastBuild.number}`);
    });
});
