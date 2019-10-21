import React, { FunctionComponent } from 'react';
import ContactUs from '../src/components/ContactUs';
import Layout from '../src/components/Layout';

const ContactUsPage: FunctionComponent = () => {
  const title = 'Wishbone Deli | Contact Us';
  const description = ''; // todo

  return (
    <Layout title={title} description={description}>
      <ContactUs />
    </Layout>
  );
};

export { ContactUsPage as default };
