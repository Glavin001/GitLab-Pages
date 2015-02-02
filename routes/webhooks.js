var express = require('express');
var router = express.Router();
var config = require('../config');
var NodeGit = require("nodegit");
var path = require("path");
var fs = require('fs');
var _ = require('lodash');
var rmdir = require('rimraf');
var mv = require('mv');
var exec = require('child_process').exec;

/* POST  */
router.post('/pages.json', function(req, res, next) {
    var payload = req.body;
    // console.log(payload);
    var userId = payload.user_id;
    var projectId = payload.project_id;
    // console.log('pages', userId, projectId);
    var afterCommit = payload.after;
    var ref = payload.ref;

    // Check if this is the deploy branch
    var deployRef = "refs/heads/"+config.deploy.deployBranch;
    if (ref !== deployRef) {
        // console.log(ref, deployRef);
        return res.end();
    }

    var opts = {
        ignoreCertErrors: 1,
        checkoutBranch: config.deploy.deployBranch,
        remoteCallbacks: {
            credentials: function(url, userName) {
                return NodeGit.Cred.sshKeyNew(
                    userName,
                    config.deploy.sshPublicKey,
                    config.deploy.sshPrivateKey,
                    "");
            }
        }
    };
    var repository = payload.repository;
    var url = repository.url;
    var t = url.split(':')[1].split('/');
    var projectNamespace = t[0];
    var projectName = t[1].split('.')[0];
    // console.log(config);
    var workingDir = config.deploy.tmpPagesDir || config.deploy.publicPagesDir;
    var repoPath = path.resolve(workingDir, projectNamespace, projectName);
    // console.log(repoPath);
    // console.log(url);

    fs.exists(repoPath, function(exists) {

        function continueFn() {
            NodeGit.Clone.clone(url, repoPath, _.cloneDeep(opts))
            .then(function(repo) {
                return repo.getCommit(afterCommit);
            })
            .done(function() {
                // Move from workingDir to pages dir
                var finalRepoPath = path.resolve(config.deploy.publicPagesDir, projectNamespace, projectName);
                // Delete workingDir
                rmdir(finalRepoPath, function() {
                    // jekyll build --safe --source .tmp/Glavin001/gitlab-pages-example/ --destination pages/Glavin001/gitlab-pages-example
                    var cmd = "jekyll build --safe --source \""+repoPath+"\" --destination \""+finalRepoPath+"\"";
                    exec(cmd, function (error, stdout, stderr) {
                        // output is in stdout
                        console.log('Done deploying '+projectNamespace+'/'+projectName);
                    });
                    // mv(repoPath, finalRepoPath, {
                    //     mkdirp: true,
                    //     clobber: true
                    // }, function(err) {
                    //     console.log('Done deploying '+projectNamespace+'/'+projectName);
                    // });
                });
            });
        }

        if (exists) {
            // Remove the original repo
            rmdir(repoPath, continueFn);
        } else {
            continueFn();
        }
    });

    // FIXME: This code below does not work. See https://github.com/nodegit/nodegit/issues/341#issuecomment-71384969
    // Check if repo already exists
    // fs.exists(repoPath, function(exists) {
    //     var promise = null;
    //     if (exists) {
    //         promise = NodeGit.Repository.open(repoPath);
    //     } else {
    //         // Clone if not already exists
    //         promise = NodeGit.Clone.clone(url, repoPath, _.cloneDeep(opts));
    //     }
    //     promise.then(function(repo) {
    //         console.log('fetch all', repo, opts);
    //         return repo.fetchAll(opts.remoteCallbacks, opts.ignoreCertErrors)
    //         // Now that we're finished fetching, go ahead and merge our local branch
    //         // with the new one
    //         .then(function(fetches) {
    //             console.log('fetches', fetches);
    //             return repo.mergeBranches("master", "origin/master");
    //         })
    //         .then(function(merges) {
    //             console.log('merges', merges);
    //             console.log('afterCommit', afterCommit);
    //             console.log('repo', repo);
    //             return repo.getCommit(afterCommit);
    //         })
    //         .then(function(commit) {
    //             console.log('commit', commit);
    //         });
    //     });
    // });

    res.end();
});

module.exports = router;
