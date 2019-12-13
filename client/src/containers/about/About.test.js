import React from 'react';
import About from './About';
import { shallow } from 'enzyme';

it('Renter About component', () => {
    const wrapper = shallow(<About />);
    expect(wrapper).toBeTruthy();
});

it('Checks for html changes', () => {
    const wrapper = shallow(<About />);
    expect(wrapper).toMatchSnapshot();
});
