
// пустое поле
module.exports = (req) => {
    return !Boolean(req.body.name);
};
