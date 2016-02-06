exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'tests/e2e-protractor/*.js'
  ],

  multiCapabilities: [{
    'browserName': 'chrome'
  }, {
    'browserName': 'phantomjs'
  }],

  chromeOnly: true,

  baseUrl: 'http://localhost:8081/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
