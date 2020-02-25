
// 1 символ
module.exports = (req) => {
    return String(req.body.name).length === 1;
};
