var express = require('express');
var router = express.Router();
var config = require('../config');
var NodeGit = require("nodegit");
var path = require("path");

/* POST  */
router.post('/pages.json', function(req, res, next) {
    var payload = req.body;
    console.log(payload);
    var userId = payload.user_id;
    var projectId = payload.project_id;
    console.log('pages', userId, projectId);
    var afterCommit = payload.after;
    var ref = payload.ref;

    var url = "git@gitlab.cs.smu.ca:Glavin001/raytracer.git";
    var opts = {
        ignoreCertErrors: 1,
        remoteCallbacks: {
            credentials: function(url, userName) {
                console.log(userName);
                return NodeGit.Cred.sshKeyNew(
                    userName,
                    config.deploy.sshPublicKey,
                    config.deploy.sshPrivateKey,
                    "");
            }
        }
    };

    var projectNamespace = "Glavin001";
    var projectName = "Raytracer";
    console.log(config);
    var repoPath = path.resolve(config.server.publicPages, projectNamespace, projectName);
    console.log(repoPath);
    res.end();

    return NodeGit.Clone.clone(url, repoPath, opts).then(function(repository) {
        console.log(repository);
    });

});

module.exports = router;
