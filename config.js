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
    // Override some config vars using environment
    if (process.env.GITLAB_URL)
        config.gitlab.url = process.env.GITLAB_URL;
    if (process.env.DEPLOY_BRANCH)
        config.deploy.deployBranch = process.env.DEPLOY_BRANCH;
    if (process.env.DEPLOY_PAGEDIR)
        config.deploy.publicPagesDir = process.env.DEPLOY_PAGEDIR;
    if (process.env.SERVER_URL)
        config.server.publicUrl = process.env.SERVER_URL;

    return config;
})();
