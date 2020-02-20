'use strict';

const iAmTeapot = require('../../src/iAmTeapot');

module.exports = (req, res, next) => {
    const db = req.db;
    const usersCollection = db.collection('users');
    usersCollection.updateOne(
        { id: req.deviceId },
        { $set: { name: req.body.name } },
    )
        .then(() => {
            res.statusCode = 302;
            res.setHeader('location', '/');
            res.end();
        })
        .catch((error) => {
            iAmTeapot(req, res, error);
        });
};
