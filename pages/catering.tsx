import React, { FunctionComponent } from 'react';
import Catering from '../src/components/Catering';
import Layout from '../src/components/Layout';

const HomePage: FunctionComponent = () => {
  const title = 'Wishbone Deli | Catering';
  const description = ''; // todo

  return (
    <Layout title={title} description={description}>
      <Catering />
    </Layout>
  );
};

export { HomePage as default };
