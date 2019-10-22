import React from 'react';

import Home from '../../components/Home';
import { shallow, ShallowWrapper } from 'enzyme';

describe('<Home />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  it('displays a greeting message', () => {
    expect(wrapper.text()).toMatch(/Hello world!/);
  });
});
