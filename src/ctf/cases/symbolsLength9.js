
// 9 символов
module.exports = (req) => {
    return String(req.body.name).length === 9;
};
