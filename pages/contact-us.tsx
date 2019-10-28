import React, { FunctionComponent } from 'react';
import ContactUs from '../src/components/ContactUs';
import Layout from '../src/components/Layout';

const ContactUsPage: FunctionComponent = () => {
  const title = 'Wishbone Deli | Contact Us';
  const description = `Got mouths to feed? We got you covered with a huge assortment of freshly prepared trays for everyone. Phone: (613) 544-5446, email: wishbone.delicatessen@gmail.com, address: 1407 John Counter Blvd, Kingston ON`;

  return (
    <Layout title={title} description={description}>
      <ContactUs />
    </Layout>
  );
};

export { ContactUsPage as default };
