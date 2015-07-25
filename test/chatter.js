var _ = require('lodash');
var sinon = require('sinon');
var nforce = require('nforce');
var assert = require('assert');

var testCases = require('./cases');

var chatter = require('../lib/chatter');

var FAKE_CLIENT_ID = 'client-id-is-fake';
var FAKE_CLIENT_SECRET = 'not-a-real-secret';
var FAKE_REDIRECT_URI = 'https://example.com';
var FAKE_INSTANCE_URL = 'https://salesforce.com';

describe('chatter plugin', function() {
  var org;
  var sandbox = sinon.sandbox.create();

  before(function(done) {
    require('../')(nforce);

    // Instantiate nforce so we can test the plugin methods
    org = nforce.createConnection({
      clientId: FAKE_CLIENT_ID,
      clientSecret: FAKE_CLIENT_SECRET,
      redirectUri: FAKE_REDIRECT_URI,
      mode: 'single',
      plugins: ['chatter']
    });

    // Fake oauth object, we won't actually make requests
    org.oauth = { instance_url: FAKE_INSTANCE_URL };
    done();
  });

  /**
   * Stub out _request so we don't actually perform the http request
   */
  beforeEach(function() {
    sandbox.stub(chatter, '_request').yields();
  });
  afterEach(function() {
    sandbox.restore();
  });

  /**
   * Generate test cases for each route
   */
  var functions = _.keys(testCases);
  functions.forEach(function(fnName) {
    describe('#' + fnName, function() {
      testCases[fnName].forEach(function(test) {
        var method = test.expectedMethod;
        var path = test.expectedPath;

        // Test sad path scenario of missing arguments
        if (test.expectedThrow) {
          it('throws an error: ' + test.expectedThrow, function(done) {
            try {
              org.chatter[fnName](test.args, error);
              function error() { done(new Error('Did not throw')); }
            } catch(err) {
              assert.equal(err.message, test.expectedThrow);
              done();
            }
          });
          return;
        }
        
        // Verifies that the right method/args/path are used
        it('performs a ' + method + ' on ' + path, function(done) {
          org.chatter[fnName](test.args, function() {
            sinon.assert.calledOnce(chatter._request);
            var args = chatter._request.args[0][0];
            var cb = chatter._request.args[0][1];

            assert.equal(args.method, method, 'expected method matches');
            assert.equal(typeof cb, 'function', 'callback is a function');
            assert.equal(args.uri, FAKE_INSTANCE_URL + path, 'expected path matches');
            if (test.expectedBody) {
              assert.deepEqual(JSON.stringify(test.expectedBody), args.body, 'expected body matches');
            }

            done();
          });
        });
      });
    });
  });
});
