
// символ переноса каретки
const RE = /[\n\r]/;

module.exports = (req) => {
    const toTest = req.body.name;
    return RE.test(toTest);
};
