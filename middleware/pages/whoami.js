'use strict';

module.exports = (req, res, next) => {
    res.send(req.cookies.device_id);
};
