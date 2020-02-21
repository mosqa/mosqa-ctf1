const assert = require('assert');
const { MongoClient } = require('mongodb');

const config = require('../config');

assert.ok(config.MONGODB_URL, 'MONGODB_URL is empty in config.js');
assert.ok(config.MONGODB_NAME, 'MONGODB_NAME is empty in config.js');

module.exports = MongoClient.connect(config.MONGODB_URL, { useUnifiedTopology: true })
    .then((client) => {
        return client.db(config.MONGODB_NAME);
    })
    .then((result) => {
        console.log('>>>> DB CONNECTED');
        return result;
    })
    .catch((e) => {
        console.error('>>>> DB CONNECTION ERROR', e);
        return Promise.reject(e);
    });
