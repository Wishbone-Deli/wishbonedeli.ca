import React from 'react';
import Link from 'next/link';
import { shallow, ShallowWrapper } from 'enzyme';
import Navbar from '../../components/Navbar';

describe('<Navbar />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Navbar />);
  });

  describe('content', () => {
    it('renders a title with link to home', () => {
      const titleWrapper = wrapper.find(Link);
      expect(titleWrapper.prop('href')).toBe('/');
    });
  });

  describe('onToggle', () => {
    const toggleClass = 'navbar__hamburger--show';
    let hamburgerWrapper: ShallowWrapper;
    let ulWrapper: ShallowWrapper;

    beforeEach(() => {
      hamburgerWrapper = wrapper.find('.navbar__hamburger');
      ulWrapper = wrapper.find('ul');
    });

    it('appends navbar__hamburger--show class to <ul>', () => {
      expect(ulWrapper.hasClass(toggleClass)).toBe(false);

      hamburgerWrapper.simulate('click');
      ulWrapper = wrapper.find('ul');
      expect(ulWrapper.hasClass(toggleClass)).toBe(true);
    });

    it('removes navbar__hamburger--show class from <ul>', () => {
      hamburgerWrapper.simulate('click');
      ulWrapper = wrapper.find('ul');
      expect(ulWrapper.hasClass(toggleClass)).toBe(true);

      hamburgerWrapper = wrapper.find('.navbar__hamburger');
      hamburgerWrapper.simulate('click');
      ulWrapper = wrapper.find('ul');
      expect(ulWrapper.hasClass(toggleClass)).toBe(false);
    });
  });
});
