const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./index');

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', upsert);

function list(req, res) {
    Controller.list()
        .then((list) => {
            response.success(req, res, list, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
}

function get(req, res) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
}

function upsert(req, res) {
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
}

module.exports = router;