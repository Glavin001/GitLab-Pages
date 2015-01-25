var express = require('express');
var router = express.Router();
var GitLab = require('gitlab');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.post('/session', function(req, res) {
//     res.json({
//         token: '12345'
//     });
// });
//
// /* GET projects listing. */
// router.get('/:token/projects/', function(req, res, next) {
//     console.log(req.params);
//     var token = req.params.token;
//     var gitlab = GitLab({
//         url: config.gitlab.url,
//         token: token
//     });
//     gitlab.projects.all(function(projects) {
//         res.json(projects);
//         // res.send('respond with a resource');
//     });
// });

router.get('/:user_id/project/:project_id/enable', function(req, res, next) {
    // console.log(req.params, req.query);
    var projectId = parseInt(req.params.project_id);
    req.session.enabledProjects = req.session.enabledProjects || [];
    req.session.enabledProjects.push(projectId);
    res.redirect('/');
});

router.get('/:user_id/project/:project_id/disable', function(req, res, next) {
    var projectId = parseInt(req.params.project_id);
    req.session.enabledProjects = req.session.enabledProjects || [];
    var enabledProjects = req.session.enabledProjects;
    var index = enabledProjects.indexOf(projectId);
    if (index !== -1) {
        enabledProjects.splice(index, 1);
    }
    res.redirect('/');
});


module.exports = router;
