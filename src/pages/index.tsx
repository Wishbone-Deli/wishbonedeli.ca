import React, { FunctionComponent } from 'react';
import Home from '../components/Home';
import Layout from '../components/Layout';

const HomePage: FunctionComponent = () => {
  const title = 'Wishbone Deli | Home';
  const description = `Fresh, down to its bone. Serving you a supreme local deli and catering experience in Kingston. Phone: (613) 544-5446, email: wishbone.delicatessen@gmail.com, address: 1407 John Counter Blvd, Kingston ON`;

  return (
    <Layout title={title} description={description}>
      <Home />
    </Layout>
  );
};

export { HomePage as default };
