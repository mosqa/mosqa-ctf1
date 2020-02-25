'use strict';

const fs = require('fs');

const iAmTeapot = require('../../src/iAmTeapot');

const tmpl = require('../../src/tmpl');
const escapeHTML = require('../../src/escapeHTML');
const usernameOrDeviceId = require('../../src/usernameOrDeviceId');

const html = fs.readFileSync(__dirname + '/rating.html', { encoding: 'utf8' });

module.exports = (req, res) => {
    const { db } = req;

    db.collection('users')
        .find(
            { flags_length: { $gt: 0 } },
            {
                limit: 20,
                sort: [ [ 'flags_length', 'descending' ] ],
            })
        .toArray()
        .then((users) => {
            const htmlChunks = users.map((user) => {
                return `
                    <tr class="rating-user">
                        <td class="rating-user-name">${ escapeHTML(formatUser(user)) }</td>
                        <td class="rating-user-score">${ escapeHTML(user.flags_length) }</td>
                    </tr>
                `
            });

            res.send(tmpl(html, {
                rating: htmlChunks.join('\n'),
            }));
        })
        .catch((error) => {
            console.error('COMMENTS', error);
            iAmTeapot(req, res, error);
        });
};

function formatUser(user) {
    if (user.name) {
        return user.name;
    }

    const id = String(user.id);
    return `${ id.slice(0, 8) }...${ id.slice(-8) }`
}
