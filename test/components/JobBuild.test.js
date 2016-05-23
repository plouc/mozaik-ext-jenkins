import test        from 'ava';
import React       from 'react';
import { shallow } from 'enzyme';
import JobBuild    from '../../src/components/JobBuild.jsx';


test('should display successful job build number and status', t => {
    const build = {
        number:    13,
        result:    'SUCCESS',
        building:  false,
        timestamp: 1457624704782
    };

    const wrapper = shallow(<JobBuild build={build} />);

    t.regex(wrapper.find('.list__item--with-status').prop('className'), /list__item--with-status--success/);
    t.regex(wrapper.text(), new RegExp(`#${build.number} ${build.result}`));
});

test('should display building job build number and status', t => {
    const build   = {
        number:    13,
        result:    null,
        building:  true,
        timestamp: 1457624704782
    };
    const wrapper = shallow(<JobBuild build={build} />);

    t.regex(wrapper.find('.list__item--with-status').prop('className'), /list__item--with-status--building/);
    t.regex(wrapper.text(), new RegExp(`#${build.number} BUILDING`));
});
