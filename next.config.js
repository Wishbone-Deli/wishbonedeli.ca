/* eslint-disable */
require('dotenv').config();
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const Dotenv = require('dotenv-webpack');

module.exports = withCSS(withSass({
  webpack: cfg => {
    // setup polyfills
    const originalEntry = cfg.entry;
    cfg.entry = async () => {
      const entries = await originalEntry();

      if (
        entries['main.js'] &&
        !entries['main.js'].includes('./polyfills.js')
      ) {
        entries['main.js'].unshift('./polyfills.js');
      }

      return entries;
    }

    // configure dotenv
    if (process.env.NODE_ENV !== 'production') {
      cfg.plugins = cfg.plugins || [];
      cfg.plugins = [...cfg.plugins, new Dotenv()];
    }

    return cfg;
  },

  env: process.env.NODE_ENV === 'production' && {
    RECAPTCHA_API_KEY: process.env.RECAPTCHA_API_KEY,
    GOOGLE_MAPS_JAVASCRIPT_API_KEY: process.env.GOOGLE_MAPS_JAVASCRIPT_API_KEY,
    API_DOMAIN: process.env.API_DOMAIN
  }
}));
