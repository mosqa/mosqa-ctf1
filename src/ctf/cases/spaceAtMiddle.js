
// пробелы в середине
const RE = /^[\w\s]+\s{2,}[\w\s]+$/;

module.exports = (req) => {
    const toTest = req.body.name;
    return RE.test(toTest);
};
