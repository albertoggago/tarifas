exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'test/server/*.js'
  ],

  capabilities: {
    'browserName': 'chrome',
    'browserName': 'firefox',
  },

  chromeOnly: true,

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
