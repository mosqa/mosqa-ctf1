
// любой символ не [0-9a-zA-Z]
// <> - чтобы не пересекаться с тегами
const RE = /[^а-яёЁ<>\s\w]/iu;

module.exports = (req) => {
    const toTest = req.body.name;
    return RE.test(toTest);
};
