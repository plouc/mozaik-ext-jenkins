import test               from 'ava';
import React              from 'react';
import { shallow }        from 'enzyme';
import ViewJobBuildStatus from '../../src/components/ViewJobBuildStatus.jsx';


test('should display a check icon for successful build', t => {
    const wrapper = shallow(<ViewJobBuildStatus build={{ result: 'SUCCESS' }} />);

    t.regex(wrapper.find('.fa').prop('className'), /fa-check-circle/);
});

test('should display a warning icon for failed build', t => {
    const wrapper = shallow(<ViewJobBuildStatus build={{ result: 'FAILURE' }} />);

    t.regex(wrapper.find('.fa').prop('className'), /fa-warning/);
});

test('should display a question icon for unknown state', t => {
    const wrapper = shallow(<ViewJobBuildStatus build={{}} />);

    t.regex(wrapper.find('.fa').prop('className'), /question-circle/);
});
