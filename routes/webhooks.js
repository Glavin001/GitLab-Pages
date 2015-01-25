var express = require('express');
var router = express.Router();

/* GET  */
router.post('/pages.json', function(req, res, next) {
    // console.log(req.body);
    var userId = req.body.user_id;
    var projectId = req.body.project_id;
    console.log('pages', userId, projectId);
    res.end();
});

module.exports = router;
