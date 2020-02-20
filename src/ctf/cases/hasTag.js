
const TAG_RE = /<[a-z][a-z0-9]{1,10}>.*?<\/[a-z][a-z0-9]{1,10}>/;

module.exports = (req) => {
    const toTest = req.body.name;
    return TAG_RE.test(toTest);
};
