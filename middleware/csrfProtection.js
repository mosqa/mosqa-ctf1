const csrfDSC = require('express-csrf-double-submit-cookie');

module.exports = csrfDSC({
    cookie: {
        name: '_csrf_token',
        httpOnly: false,
        path: '/',
    },
});
