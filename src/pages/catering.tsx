import React, { FunctionComponent } from 'react';
import Catering from '../components/Catering';
import Layout from '../components/Layout';

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
