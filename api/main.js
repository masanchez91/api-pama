const express = require('express');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const { config } = require('../config');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const errors = require('../network/errors');
const swaggerDoc = require('./components/swagger.json');
const app = express();

function main() {
    app.use(bodyParser.json());

    app.use('/api/user', user);
    app.use('/api/auth', auth);
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

    app.use(errors);

    app.listen(config.api.port, () => {
        console.info(`
        ################################################
        🛡️  Server listening on port: ${config.api.port} 🛡️
        ################################################
    `);
    }).on('error', err => {
        console.error(err);
        process.exit(1);
    });
}

main();