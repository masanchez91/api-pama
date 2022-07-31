const dummy = require('./dummy');
const mysql = require('./mysql');
const config = require('../config');

module.exports = {
    store: () => {
        return config.ctx === 'development' ? mysql : dummy;
    }
}