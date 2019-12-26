import React, { ReactNode, FC } from 'react';
import { NextSeo } from 'next-seo';
import Navbar from './Navbar';
import Footer from './Footer';
import DaysNotification from './ClosedToast';

import '../styles/style.scss';

export type LayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({
  title,
  description,
  children,
}: LayoutProps) => {
  return (
    <>
      <NextSeo title={title} description={description} />
      <Navbar />
      <DaysNotification />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
