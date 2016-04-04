import test        from 'ava';
import React       from 'react';
import { shallow } from 'enzyme';
import JobItem     from '../../src/components/JobItem.jsx';


test('should display job name and number', t => {
    const job = {
        name:      'test job',
        lastBuild: {
            number:    13,
            result:    'SUCCESS',
            timestamp: 1457624704782
        }
    };

    const wrapper = shallow(<JobItem job={job} />);

    t.regex(wrapper.prop('className'), /jenkins__job--success/);
    t.regex(wrapper.text(), new RegExp(`${job.name} #${job.lastBuild.number}`));
});
