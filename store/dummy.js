const db = {
    'users': [
        { id: 1, name: 'Mauro' },
        { id: 2, name: 'Damian'},
    ]
};

async function list(table) {
    return db[table] || [];
}

async function get(table, id) {
    let col = await list(table);
    return col.filter(item => item.id == id)[0] || null;
}

async function update(table, data, id) {
    let col = await list(table);
    delete data.id;

    col.filter(item => {
        if (item.id == id) {
            let keys = Object.keys(data);
            keys.forEach(key => item[key] = data[key]);
        }
    });

    return data;
}

async function upsert(table, data) {
    if (!db[table]) {
        db[table] = [];
    }

    const result = await get(table, data.id);

    if (result === null) {
        db[table].push(data);
    } else {
        await update(table, data, data.id);
    }

    console.info(`DB: `, db);
}

async function remove(table, id) {
    const result = await get(table, id);

    if (result) {
        let col = await list(table);
        
        col.filter((item, i) => {
            if (item.id == id) {
                delete col[i];
            }
        });
    }

    return null;
}

async function query(table, q) {
    let col = await list(table);
    let keys = Object.keys(q);
    let key = keys[0];
    return col.filter(item => item[key] == q[key])[0] || null;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query,
};