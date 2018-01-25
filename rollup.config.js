'use strict';

const nodeResolve = require('rollup-plugin-node-resolve');
const alias = require('rollup-plugin-alias');

// Beware of:
// https://github.com/maxdavidson/rollup-plugin-sourcemaps/issues/33

module.exports = {
  input: 'build/main.js', // entry point for the application
  output: {
    file: 'build/main.bundle.js',
    format: 'umd', // ready-to-execute form, to put on a page
    strict: true,
    name: 'Exceptional'
  },
  // options: {
  //   useStrict: true
  // },
  onwarn: function (warning) {
    // Skip certain warnings
    if (warning.code === 'THIS_IS_UNDEFINED') { return; }
    console.warn(warning.message);
  },
  plugins: [
    nodeResolve({
      main: true,
      browser: true,
      jsnext: true,
    })
  ]
}
