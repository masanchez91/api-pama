const express = require('express');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const config = require('../config');
const user = require('./components/user/network')
const auth = require('./components/auth/network')
const swaggerDoc = require('./components/swagger.json')
const app = express();

app.use(bodyParser.json());

app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.listen(config.api.port, () => {
    console.info('Api escuchando en el puerto', config.api.port);
});