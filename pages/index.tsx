import React, { FunctionComponent } from 'react';
import Home from '../src/components/Home';
import Layout from '../src/components/Layout';

const HomePage: FunctionComponent = () => {
  const title = 'Wishbone Deli | Home';
  const description = ''; // todo

  return (
    <Layout title={title} description={description}>
      <Home />
    </Layout>
  );
};

export { HomePage as default };
