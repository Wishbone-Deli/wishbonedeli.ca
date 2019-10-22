import React, { FunctionComponent } from 'react';
import EatIn from '../src/components/EatIn';
import Layout from '../src/components/Layout';

const HomePage: FunctionComponent = () => {
  const title = 'Wishbone Deli | Eat In';
  const description = ''; // todo

  return (
    <Layout title={title} description={description}>
      <EatIn />
    </Layout>
  );
};

export { HomePage as default };
