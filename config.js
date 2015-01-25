var path = require("path");
var _ = require('lodash');

module.exports = (function() {
    var defaults = require('./default_config.js');
    // Load custom config
    var config = {};
    _.merge(config, defaults);
    try {
        var c = require('./_config.js');
        _.merge(config, c);
    } catch (e) {
        console.error(e);
    }
    return config;
})();
