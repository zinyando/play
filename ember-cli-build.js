'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    babel: {
      plugins: [require.resolve('ember-auto-import/babel-plugin')],
    },
    autoImport: {
      webpack: {
        experiments: {
          topLevelAwait: true,
        },
        externals: {
          'node:fs': 'commonjs node:fs',
          'node:crypto': 'commonjs node:crypto',
        },
      },
    },
  });

  return app.toTree();
};
