/* global describe it */
import React       from 'react';
import { shallow } from 'enzyme';
import expect      from 'expect';
import JobBuild    from '../../components/JobBuild.jsx';


describe('<JobBuild />', () => {
    it('should display job build number and status', () => {
        const build   = {
            number:    13,
            result:    'SUCCESS',
            timestamp: 1457624704782
        };
        const wrapper = shallow(
            <JobBuild build={build} />
        );

        expect(wrapper.find('.list__item--with-status').prop('className')).toContain('list__item--with-status--success');
        expect(wrapper.text()).toContain(`#${build.number} ${build.result}`);
    });
});
