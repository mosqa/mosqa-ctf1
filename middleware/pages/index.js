'use strict';

const fs = require('fs');

const tmpl = require('../../src/tmpl');

const html = fs.readFileSync(__dirname + '/index.html', { encoding: 'utf8' });

module.exports = (req, res, next) => {
    res.send(tmpl(html, {
        flags_length: req.user.flags.length,
        user_name: formatUser(req),
        _csrf_token: req.cookies._csrf_token
    }));
};

function formatUser(req) {
    if (req.user.name) {
        return req.user.name;
    }

    const deviceId = String(req.cookies.device_id);
    return `${ deviceId.slice(0, 8) }...${ deviceId.slice(-8) }`;
}
