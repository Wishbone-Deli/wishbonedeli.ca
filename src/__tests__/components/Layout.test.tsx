import React, { ReactNode, ReactElement } from 'react';
import { NextSeo } from 'next-seo';
import { shallow, ShallowWrapper } from 'enzyme';
import Layout, { LayoutProps } from '../../components/Layout';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// better suited for a snapshot testing, which is not in scope
describe.skip('<Layout />', () => {
  let wrapper: ShallowWrapper;
  let props: Pick<LayoutProps, 'title' | 'description'>;
  let node: ReactNode;

  beforeEach(() => {
    props = {
      title: 'test title',
      description: 'test description',
    };
    node = <div>Test node</div>;
    wrapper = shallow(<Layout {...props}>{node}</Layout>);
  });

  it('renders NextSeo first', () => {
    const nextSeoWrapper = wrapper.children().first();
    expect(nextSeoWrapper.is(NextSeo)).toBe(true);
    expect(nextSeoWrapper.props()).toEqual(props);
  });

  it('renders Navbar second', () => {
    const navbarWrapper = wrapper.children().at(1);
    expect(navbarWrapper.is(Navbar)).toBe(true);
  });

  it('renders the passed in child third', () => {
    const nodeWrapper = wrapper.children().at(2);
    expect(nodeWrapper.matchesElement(node as ReactElement)).toBe(true);
  });

  it('renders Footer last', () => {
    const footerWrapper = wrapper.children().last();
    expect(footerWrapper.is(Footer)).toBe(true);
  });
});
