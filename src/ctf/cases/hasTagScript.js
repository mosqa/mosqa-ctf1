
// xss: тег script с алертом внутри (не важно что в скобках в алерте)
const TAG_RE = /<script.*?>.*?<\/script>/;

module.exports = (req) => {
    const toTest = req.body.name;
    return TAG_RE.test(toTest);
};
