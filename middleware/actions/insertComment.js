'use strict';

const iAmTeapot = require('../../src/iAmTeapot');
const ctf = require('../../src/ctf');

module.exports = (req, res, next) => {
    const db = req.db;
    const commentsCollection = db.collection('comments');
    commentsCollection.insertOne({
        device_id: req.deviceId,
        name: req.body.name,
        comment: req.body.comment,
    })
        .then(() => {
            const winCases = ctf(req);
            if (winCases.length > 0) {
                const currentFlags = req.user.flags;
                const nextFlags = [ ...currentFlags ];
                winCases.forEach((id) => {
                    const flag = currentFlags.find((flag) => flag.id === id);
                    if (!flag) {
                        nextFlags.push({ id: id, request_id: 'TODO', timestamp: Date.now() });
                    }
                });
                console.log('currentFlags', currentFlags);
                console.log('winCases', winCases);
                if (nextFlags.length > currentFlags.length) {
                    db.collection('users')
                        .updateOne(
                            { id: req.deviceId },
                            { $set: { flags: nextFlags } },
                        )
                        .then(() => {
                            res.statusCode = 302;
                            res.setHeader('location', '/');
                            res.end();
                        })
                        .catch((error) => {
                            iAmTeapot(req, res, error);
                        });
                } else {
                    res.statusCode = 302;
                    res.setHeader('location', '/');
                    res.end();
                }
            } else {
                res.statusCode = 302;
                res.setHeader('location', '/');
                res.end();
            }
        })
        .catch((error) => {
            iAmTeapot(req, res, error);
        });
};
