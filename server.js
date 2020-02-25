'use strict';

const express = require('express');

const csrfProtection = require('./middleware/csrfProtection');

const app = express();
app.set('trust proxy', true);
app.set('x-powered-by', false);

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('cookie-parser')());

app.use(require('./middleware/db'));
app.use(require('./middleware/deviceId'));
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

// eslint-disable-next-line no-console
app.listen(8080, '127.0.0.1', () => console.log('>>>> App listen at port 8080!'));
