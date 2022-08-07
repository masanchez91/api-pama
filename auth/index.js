const jwt = require('jsonwebtoken');
const { config } = require('../config');
const error = require('../utils/error');
const secret = config.jwt.authJwtSecret;

function sign(data) {
    return jwt.sign(JSON.stringify(data), secret)
}

function verify(data) {
    return jwt.verify(JSON.stringify(data), secret);
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        if (decoded.id !== owner) {
            throw error('No tienes permiso para realizar esta acción', 401);
        }
    },
}

function getToken(auth) {
    if (!auth) throw error('No viene Token', 400);
    if (auth.indexOf('Bearer ') === -1) throw error('Formato invalido', 400);

    let token = auth.replace('Bearer ', '');
    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;
    return decoded;
}

module.exports = {
    sign,
    check,
};