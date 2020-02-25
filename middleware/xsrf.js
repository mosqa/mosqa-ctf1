'use strict';

const crypto = require('crypto');

module.exports = (req, res, next) => {
    // быстро костыль для бага первого захода
    if (!req.cookies['_csrf_token']) {
        const csrfToken = crypto.randomBytes(24).toString('hex');
        res.cookie('_csrf_token', csrfToken, {
            httpOnly: false,
            path: '/',
        });
        req.cookies['_csrf_token'] = csrfToken;
    }

    next();
};
