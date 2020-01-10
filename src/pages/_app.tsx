import React from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { Client, defaultExchanges, Provider } from 'urql';

const client = new Client({
  url: 'http://localhost:3000/api',
  exchanges: defaultExchanges,
});

export const Application: NextPage<AppProps> = ({
  Component,
  pageProps,
}: AppProps) => (
  <Provider value={client}>
    <Component {...pageProps} />;
  </Provider>
);

export { Application as default };
