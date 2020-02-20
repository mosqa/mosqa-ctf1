'use strict';

const fs = require('fs');

const tmpl = require('../../src/tmpl');

const html = fs.readFileSync(__dirname + '/index.html', { encoding: 'utf8' });

module.exports = (req, res, next) => {
    res.send(tmpl(html, {
        flags_length: req.user.flags.length,
        user_name: req.user.name || req.cookies.device_id,
        _csrf_token: req.cookies._csrf_token
    }));
};
