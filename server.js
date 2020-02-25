'use strict';

const express = require('express');

const csrfProtection = require('./middleware/csrfProtection');

const app = express();
app.set('trust proxy', true);
app.set('x-powered-by', false);

app.use(express.static('public'));

app.use(require('cookie-parser')());
app.use(require('./middleware/db'));
app.use(require('./middleware/deviceId'));

app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(express.json({ limit: '1mb' }));
app.use(require('./middleware/processBodyParserError'));

app.use(require('./middleware/xsrf'));
app.use(csrfProtection);

app.get('/', require('./middleware/pages/index'));

app.use('/admin/', require('./middleware/pages/admin'));
app.get('/comments/', require('./middleware/pages/comments'));
app.get('/rating/', require('./middleware/pages/rating'));
app.get('/whoami/', require('./middleware/pages/whoami'));

app.post(
    '/ajax/update_name/',
    csrfProtection.validate,
    require('./middleware/actions/updateName'),
);

app.post(
    '/ajax/post_comment/',
    csrfProtection.validate,
    require('./middleware/actions/insertComment'),
);

app.get(
    '/ajax/post_comment/',
    (req, res) => {
        res.send('b3fb6d8b0d33e835dd6447319735e979f2dccdda589ae7a0')
    },
);

// eslint-disable-next-line no-console
app.listen(8080, '127.0.0.1', () => console.log('>>>> App listen at port 8080!'));
