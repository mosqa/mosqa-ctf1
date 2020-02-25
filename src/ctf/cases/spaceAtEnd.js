
// пробелы в конце
const RE = /\s+$/;

module.exports = (req) => {
    const toTest = req.body.name;
    return RE.test(toTest);
};
