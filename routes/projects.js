var express = require('express');
var router = express.Router();
var GitLab = require('gitlab');
var config = require('../config');
var fs = require('fs');
var _ = require('lodash');
var debug = require('debug')('routes:projects');

router.get('/:project_id/enable', function(req, res, next) {
    // debug(req.params, req.query);
    var projectId = parseInt(req.params.project_id);
    var token = req.session.token;
    if (!token) {
        return res.redirect('/');
    }
    var gitlab = GitLab({
        url: config.gitlab.url,
        token: token
    });
    fs.readFile(config.deploy.sshPublicKey, function(err, data) {
        if (err) {
            return res.redirect('/');
        }
        var key = data.toString();
        var params = {
            id: projectId,
            title: "GitLab Pages",
            key: key
        }
        gitlab.projects.deploy_keys.addKey(projectId, params, function(results) {
            var webhookUrl = config.server.publicUrl+"/webhooks/pages.json";
            gitlab.projects.hooks.list(projectId, function(hooks) {
                if (_.findIndex(hooks, { 'url': webhookUrl }) === -1) {
                    gitlab.projects.hooks.add(projectId, webhookUrl, function(results) {
                        res.redirect('/');
                    });
                } else {
                    res.redirect('/');
                }
            });
        });
    });
});

router.get('/:project_id/disable', function(req, res, next) {
    var projectId = parseInt(req.params.project_id);
    var token = req.session.token;
    if (!token) {
        return res.redirect('/');
    }
    var gitlab = GitLab({
        url: config.gitlab.url,
        token: token
    });

    // Check if webhook has already been added
    var webhookUrl = config.server.publicUrl+"/webhooks/pages.json";
    gitlab.projects.hooks.list(projectId, function(hooks) {
        var index = _.findIndex(hooks, { 'url': webhookUrl });
        if (index !== -1) {
            // webhook has been added
            // Project is already enabled
            // Remove webhook to disable it
            var hook = hooks[index];
            var hookId = hook.id;
            gitlab.projects.hooks.remove(projectId, hookId, function(result) {
                res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    });

});

module.exports = router;
