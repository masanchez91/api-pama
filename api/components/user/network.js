const express = require('express');
const router = express.Router();
const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/:id', secure('update'), upsert);
router.delete('/:id', secure('delete'), remove);

function list(req, res, next) {
    Controller.list()
        .then((list) => {
            response.success(req, res, list, 200);
        })
        .catch(next);
}

function get(req, res, next) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
}

function upsert(req, res, next) {
    Controller.upsert(req.body, req.params.id)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
}

function remove(req, res, next) {
    Controller.remove(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
}

module.exports = router;