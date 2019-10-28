/* eslint-disable */
require('dotenv').config();
const withSass = require('@zeit/next-sass');
const Dotenv = require('dotenv-webpack');

module.exports = withSass({
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
    cfg.plugins = cfg.plugins || [];
    cfg.plugins = [...cfg.plugins, new Dotenv()];

    return cfg;
  }
});
