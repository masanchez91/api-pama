const auth = require('../../../auth');

module.exports = function checkAuth(action) {
    function middleware(req, res, next) {
        const owner = req.params.id;

        switch (action) {
            case 'update':
                auth.check.own(req, owner);
                next();
                break;
            case 'delete':
                auth.check.own(req, owner);
                next();
                break;
            default:
                next();
        }
    }

    return middleware;
};