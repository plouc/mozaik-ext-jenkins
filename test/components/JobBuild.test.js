import test        from 'ava';
import React       from 'react';
import { shallow } from 'enzyme';
import JobBuild    from '../../src/components/JobBuild.jsx';


test('should display job build number and status', t => {
    const build = {
        number:    13,
        result:    'SUCCESS',
        timestamp: 1457624704782
    };

    const wrapper = shallow(<JobBuild build={build} />);

    t.regex(wrapper.find('.list__item--with-status').prop('className'), /list__item--with-status--success/);
    t.regex(wrapper.text(), new RegExp(`#${build.number} ${build.result}`));
});
