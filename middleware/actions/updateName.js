'use strict';

const iAmTeapot = require('../../src/iAmTeapot');

module.exports = (req, res, next) => {
    if (!req.body.name || String(req.body.name).length > 50) {
        res.statusCode = 302;
        res.setHeader('location', '/?err=INVALID_USERNAME');
        res.end();
        return;
    }

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
