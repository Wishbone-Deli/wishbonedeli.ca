import React, { FunctionComponent } from 'react';
import EatIn from '../components/EatIn';
import Layout from '../components/Layout';

const HomePage: FunctionComponent = () => {
  const title = 'Wishbone Deli | Eat In';
  const description = `From a hearty omelette for a warm breakfast to a toasty sandwich to go, there is a variety of mouth-watering food to choose from. Phone: (613) 544-5446, email: wishbone.delicatessen@gmail.com, address: 1407 John Counter Blvd, Kingston ON`;

  return (
    <Layout title={title} description={description}>
      <EatIn />
    </Layout>
  );
};

export { HomePage as default };
