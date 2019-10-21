import React from 'react';
import { shallow } from 'enzyme';
import Link, { LinkProps } from 'next/link';
import * as Router from 'next/router';
import ActiveLink from '../../components/ActiveLink';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('<ActiveLink>', () => {
  describe('activeClassName feature', () => {
    let activeClassName: string;
    let existingClassName: string;
    let href: string;

    beforeEach(() => {
      activeClassName = 'active-class-name';
      existingClassName = 'existing-class-name';
      href = '/my-link';
    });

    it("does not append activeClassName if the current route is not the same as ActiveLink's", () => {
      const pathname = 'not-my-link';

      ((Router.useRouter as unknown) as jest.Mock<
        Pick<Router.NextRouter, 'pathname'>
      >).mockReturnValue({ pathname });

      const wrapper = shallow(
        <ActiveLink activeClassName={activeClassName} href={href}>
          <a className={existingClassName}>My link</a>
        </ActiveLink>,
      );

      expect(wrapper.find('a').hasClass(existingClassName)).toBe(true);
      expect(wrapper.find('a').hasClass(activeClassName)).toBe(false);
    });

    it("appends activeClassName if the current route is the same as ActiveLink's", () => {
      const pathname = '/my-link';

      ((Router.useRouter as unknown) as jest.Mock<
        Pick<Router.NextRouter, 'pathname'>
      >).mockReturnValue({ pathname });

      const wrapper = shallow(
        <ActiveLink activeClassName={activeClassName} href={href}>
          <a className={existingClassName}>My link</a>
        </ActiveLink>,
      );

      expect(wrapper.find('a').hasClass(existingClassName)).toBe(true);
      expect(wrapper.find('a').hasClass(activeClassName)).toBe(true);
    });
  });

  it('uses <Link> as its child', () => {
    const props: LinkProps = {
      href: 'my-link',
      as: 'test',
    };
    const jsx = <a>My link</a>;
    const wrapper = shallow(
      <ActiveLink activeClassName="" {...props}>
        {jsx}
      </ActiveLink>,
    );

    expect(wrapper.find(Link).props()).toEqual({ ...props, children: jsx });
  });
});
