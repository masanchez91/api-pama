require('dotenv').config();

const config = {
    api: {
        port: process.env.PORT || 3000,
    },
    jwt: {
        authJwtSecret: process.env.AUTH_JWT_SECRET ||'',
    },
    mysql: {
        host: process.env.MYSQL_HOST || '',
        user: process.env.MYSQL_USER || '',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DB || '',
    },
    ctx:  process.env.NODE_ENV || '',
};

module.exports = { config: config };