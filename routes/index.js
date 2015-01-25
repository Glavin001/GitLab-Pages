var express = require('express');
var router = express.Router();
var GitLab = require('gitlab');
var config = require('../config');
var async = require('async');
var _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
    var token = req.session.token;
    if (token) {

        var gitlab = GitLab({
            url: config.gitlab.url,
            token: token
        });

        gitlab.projects.all(function(projects) {

            // Flag projects as being enabled
            async.map(projects, function(project, callback) {

                var projectId = project.id;
                project.pages_enabled = false;
                gitlab.projects.deploy_keys.listKeys(projectId, function(keys) {
                    // Check if deploy key already has been added
                    if (_.findIndex(keys, { 'title': "GitLab Pages" }) !== -1) {
                        // Check if webhook has already been added
                        var webhookUrl = config.server.publicUrl+"/webhooks/pages.json";
                        gitlab.projects.hooks.list(projectId, function(hooks) {
                            if (_.findIndex(hooks, { 'url': webhookUrl }) !== -1) {
                                // Both deploy key and webhook has been added
                                // Project is already enabled
                                project.pages_enabled = true;
                                callback(null, project);
                            } else {
                                callback(null, project);
                            }
                        });
                    } else {
                        callback(null, project);
                    }
                });


            }, function(err, projects){

                console.log(projects);
                // results is now an array of stats for each file
                res.render('index', {
                    title: 'GitLab Pages',
                    user: req.session.user,
                    projects: projects
                });

            });



        });
    } else {
        res.render('login', {
            title: 'GitLab Pages',
            user: null,
            projects: []
        });
    }
});

/* GET home page. */
router.post('/login', function(req, res, next) {
    // console.log(req.body);
    var token = req.body.token;
    if (!token) {
        return res.redirect('/');
    }
    var gitlab = GitLab({
        url: config.gitlab.url,
        token: token
    });

    gitlab.users.current(function(user) {
        console.log(user);
        if (user) {
            req.session.user = user;
            req.session.token = token;
            req.session.enabledProjects = [];
        }
        res.redirect('/');
    });
});

module.exports = router;
