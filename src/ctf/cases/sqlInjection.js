
// sql injection: в начале строки стоит апостроф
const RE = /^`/;

module.exports = (req) => {
    const toTest = req.body.name;
    return RE.test(toTest);
};
