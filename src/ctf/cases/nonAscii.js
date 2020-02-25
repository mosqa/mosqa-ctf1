
// не ASCII символ + русские
const RE = /[^\u0000-\u00FFа-яёЁ]/iu;

module.exports = (req) => {
    const toTest = req.body.name;
    return RE.test(toTest);
};
