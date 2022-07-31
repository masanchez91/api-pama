const nanoid = require('nanoid');
const auth = require('../auth');
const TABLA = 'users';

module.exports = function (injectedStore) {
    let store = injectedStore;
    
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(data, id) {
        const user = {
            id: id || nanoid(),
            name: data.name,
            username: data.username,
        }

        if (data.password || data.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: data.password,
            });
        }

        return store.upsert(TABLA, user);
    }

    async function remove(id) {
        return store.remove(TABLA, id);
    }

    return {
        list,
        get,
        upsert,
        remove,
    }
};