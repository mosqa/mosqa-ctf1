'use strict';

const fs = require('fs');

const tmpl = require('../../src/tmpl');

const html = fs.readFileSync(__dirname + '/admin.html', { encoding: 'utf8' });

module.exports = (req, res, next) => {
    res.send(html);
};
