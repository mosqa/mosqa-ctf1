const dbConnector = require('../db/connector');
const iAmTeapot = require('../src/iAmTeapot');

module.exports = (req, res, next) => {
    dbConnector.then(
        (db) => {
            // export db connector to req
            req.db = db;
            next();
        },
        (error) => iAmTeapot(req, res, error),
    );
};
