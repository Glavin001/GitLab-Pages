var express = require('express');
var router = express.Router();
var GitLab = require('gitlab');
var config = {
    gitlab: {
        url: "http://gitlab.cs.smu.ca"
    }
};

/* GET home page. */
router.get('/', function(req, res, next) {
    var token = req.session.token;
    if (token) {

        var gitlab = GitLab({
            url: config.gitlab.url,
            token: token
        });

        gitlab.projects.all(function(projects) {
            var enabledProjects = req.session.enabledProjects || [];

            // Flag projects as being enabled
            for (var i=0, len=projects.length; i<len; i++) {
                var project = projects[i];
                var projectId = project.id;
                if (enabledProjects.indexOf(projectId) !== -1) {
                    project.pages_enabled = true;
                } else {
                    project.pages_enabled = false;
                }
            }
            // console.log(projects, enabledProjects);

            res.render('index', {
                title: 'Express',
                user: req.session.user,
                projects: projects
            });

        });
    } else {
        res.render('login', {
            title: 'Express'
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
