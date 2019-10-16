import React, { FunctionComponent } from 'react';
import Home from '../src/components/Home';
import Layout from '../src/components/Layout';

const HomePage: FunctionComponent = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export { HomePage as default };
