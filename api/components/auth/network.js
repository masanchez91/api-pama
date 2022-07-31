const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./index');

router.post('/login', function (req, res, next) {
    Controller.login(req.body.username, req.body.password)
        .then((token) => {
            response.success(req, res, token, 200);
        })
        .catch(next);
});

module.exports = router;