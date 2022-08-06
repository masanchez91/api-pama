const mysql = require('mysql');
const config = require('../config');

const dbConf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let connection;

function handleConnection () {
    connection = mysql.createConnection(dbConf);
    
    connection.connect((err) => {
        if (err) {
            console.error('[db error]', err);
            setTimeout(handleConnection, 2000);
        } else {
            console.info('DB Connection established');
        }
    });

    connection.on('error', err => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConnection();
        } else {
            throw err;
        }
    });
}

handleConnection();

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table};`, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=?;`, id, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?;`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

function update(table, data, id) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?;`, [data, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

async function upsert(table, data) {
    const result = await get(table,data.id);
    if(result.length < 1) {
        return insert(table, data);
    } else {
        return update(table, data);
    }
}

function query(table, query) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        })
    })
}

module.exports = {
    list,
    get,
    upsert,
    query,
}

