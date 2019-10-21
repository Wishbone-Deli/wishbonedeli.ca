import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Footer from '../../components/Footer';

describe('<Footer />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Footer />);
  });

  it('is wrapped in <footer> tag', () => {
    expect(wrapper.first().is('footer')).toBe(true);
  });

  it('displays the current copyright date', () => {
    const copyrightSymbol = '\u00A9';
    const currentYear = new Date().getFullYear();
    const copyrightClaim = `Wishbone Delicatessen ${copyrightSymbol} ${currentYear}, All Rights Reserved`;
    expect(wrapper.text()).toMatch(copyrightClaim);
  });
});
