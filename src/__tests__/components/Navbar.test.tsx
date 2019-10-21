import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import { shallow, ShallowWrapper } from 'enzyme';
import Navbar from '../../components/Navbar';
import ActiveLink, { ActiveLinkProps } from '../../components/ActiveLink';

describe('<Navbar />', () => {
  let wrapper: ShallowWrapper;
  let activeLinks: ShallowWrapper<PropsWithChildren<ActiveLinkProps>>;

  beforeEach(() => {
    wrapper = shallow(<Navbar />);
    activeLinks = wrapper.find(ActiveLink);
  });

  describe('content', () => {
    it('renders a title with link to home', () => {
      const titleWrapper = wrapper.find(Link);
      expect(titleWrapper.prop('href')).toBe('/');
    });
  });

  it('renders ActiveLink Home with link to /', () => {
    expect(activeLinks.prop('href')).toBe('/');
  });
});
