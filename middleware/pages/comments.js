'use strict';

const fs = require('fs');

const iAmTeapot = require('../../src/iAmTeapot');

const tmpl = require('../../src/tmpl');
const escapeHTML = require('../../src/escapeHTML');

const html = fs.readFileSync(__dirname + '/comments.html', { encoding: 'utf8' });

module.exports = (req, res) => {
    const { db } = req;

    db.collection('comments')
        .find(
            {
                comment: { $not: /^$/ },
            },
            {
                limit: 10,
                sort: [ [ 'ts', 'descending' ] ],
            })
        .toArray()
        .then((comments) => {
            const htmlChunks = comments.map((comment) => {
                const dt = comment.ts ? new Date(comment.ts) : null;
                const datefmt = dt ? `${ dt.getHours() }:${ dt.getMinutes() }:${ dt.getSeconds() }` : '???';
                return `
                    <div class="comment">
                        <div class="comment-meta">
                            <div class="comment-date">${ datefmt }</div>
                        </div>
                        <div class="comment-comment"><pre>${ escapeHTML(comment.comment) }</pre></div>
                    </div>
                `
            });

            res.send(tmpl(html, {
                comments: htmlChunks.join('\n'),
            }));
        })
        .catch((error) => {
            console.error('COMMENTS', error);
            iAmTeapot(req, res, error);
        });
};
