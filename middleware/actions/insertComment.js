'use strict';

const iAmTeapot = require('../../src/iAmTeapot');
const ctf = require('../../src/ctf');

module.exports = (req, res,) => {
    if (String(req.body.name).length > 50) {
        res.statusCode = 302;
        res.setHeader('location', '/?err=INVALID_COMMENT_USERNAME#ctf');
        res.end();
        return;
    }

    if (String(req.body.comment).length > 200) {
        res.statusCode = 302;
        res.setHeader('location', '/?err=INVALID_COMMENT_TEXT#ctf');
        res.end();
        return;
    }

    res.cookie('x-token', 'f442c7783c3d1f7c3958a6198342918d10130237a9145847');

    const db = req.db;
    const commentsCollection = db.collection('comments');
    commentsCollection.insertOne({
        device_id: req.deviceId,
        name: req.body.name || '',
        comment: req.body.comment || '',
        ts: Date.now(),
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
                if (nextFlags.length > currentFlags.length) {
                    db.collection('users')
                        .updateOne(
                            { id: req.deviceId },
                            {
                                $set: {
                                    flags: nextFlags,
                                    flags_length: nextFlags.length,
                                    flag_last_ts: Date.now(),
                                }
                            },
                        )
                        .then(() => {
                            res.statusCode = 302;
                            res.setHeader('location', '/#ctf');
                            res.end();
                        })
                        .catch((error) => {
                            iAmTeapot(req, res, error);
                        });
                } else {
                    res.statusCode = 302;
                    res.setHeader('location', '/#ctf');
                    res.end();
                }
            } else {
                res.statusCode = 302;
                res.setHeader('location', '/#ctf');
                res.end();
            }
        })
        .catch((error) => {
            iAmTeapot(req, res, error);
        });
};
