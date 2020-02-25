'use strict';

const createDeviceId = require('../src/createDeviceId');
const iAmTeapot = require('../src/iAmTeapot');

module.exports = (req, res, next) => {
    let deviceId;
    if (req.cookies.device_id) {
        deviceId = req.cookies.device_id;
    } else {
        deviceId = createDeviceId();
        res.cookie('device_id', deviceId, { maxAge: 10 * 365 * 24 * 60 * 60 * 1000, httpOnly: true });
        req.cookies.device_id = deviceId;
    }
    req.deviceId = deviceId;

    const db = req.db;
    const usersCollection = db.collection('users');
    usersCollection
        .findOne({ id: deviceId })
        .then((result) => {
            if (result === null) {
                const data = {
                    id: deviceId,
                    name: '',
                    flags: [],
                    flags_length: 0,
                };

                return usersCollection.insertOne(data).then(() => data);
            } else {
                return result;
            }

        })
        .then((result) => {
            req.user = result;
            next();
        })
        .catch((error) => iAmTeapot(req, res, error));
};
