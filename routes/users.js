var express = require('express');
var router = express.Router();
var GitLab = require('gitlab');
var debug = require('debug')('routes:users');

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
//     debug(req.params);
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

module.exports = router;
