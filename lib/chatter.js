var chatter = exports; exports.constructor = function chatter(){};

var _ = require('lodash');
var mustache = require('mustache');

var routes = require('./routes');

/**
 * Initialize the nforce chatter plugin
 */
chatter.initialize = function() {
  return function(nforce) {
    var plugin = nforce.plugin('chatter');
    routes.forEach(function(route) {
      plugin.fn(route.name, function(args, cb) {
        chatter._validateArgs(args, route.args);

        var opts = this._getOpts(args, cb);
        opts.method = route.method;

        opts.uri = chatter._buildUri(route, {
          instanceUrl: opts.oauth.instance_url,
          version: this.apiVersion
        }, args);

        if (route.body) {
          opts.body = JSON.stringify(route.body(args));
        }

        chatter._request.bind(this)(opts, opts.callback);
      });
    });
  };
};

/**
 * Perform request, allows stubbing for tests
 *
 * @param {object} opts
 * @param {function} cb
 */
chatter._request = function(opts, cb) {
  this._apiRequest(opts, cb);
};

/**
 * Build the required resource's URI
 *
 * @param {object} route - Route object
 * @param {object} opts - Render options
 * @param {object} args - Route arguments
 */
chatter._buildUri = function(route, opts, args) {
  var endpoint = '{{{instanceUrl}}}/services/data/{{{version}}}';
  var uri = mustache.render(endpoint, opts);
  var path = mustache.render(route.path, args);
  return uri + path;
};

/**
 * Validate the arguments being passed
 *
 * @param {object} args
 * @param {array} required
 */
chatter._validateArgs = function(args, required) {
  var keys = _.keys(args);
  var missing = [];
  required.forEach(function(key) {
    if (!_.contains(keys, key)) {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    throw new Error('Arguments required: ' + missing.join(', '));
  }
};
