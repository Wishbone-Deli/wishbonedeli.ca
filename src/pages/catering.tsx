import React, { FunctionComponent } from 'react';
import Catering from '../components/Catering';
import Layout from '../components/Layout';

const HomePage: FunctionComponent = () => {
  const title = 'Wishbone Deli | Catering';
  const description = `Got mouths to feed? We got you covered with a huge assortment of freshly prepared trays for everyone. Phone: (613) 544-5446, email: wishbone.delicatessen@gmail.com, address: 1407 John Counter Blvd, Kingston ON`;

  return (
    <Layout title={title} description={description}>
      <Catering />
    </Layout>
  );
};

export { HomePage as default };
