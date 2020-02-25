
const QUOTE_RE = /"/g;
const LT_RE = /</g;
const GT_RE = />/g;

module.exports = (string = '') => {
    return string
        .replace(QUOTE_RE, '&quot;')
        .replace(LT_RE, '&lt;')
        .replace(GT_RE, '&gt;');
};
