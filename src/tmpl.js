module.exports = (text, data) => {
    return text.replace(/{{([^{]+)}}/g, function(fullMatch, dataID) {
        if (typeof data[dataID] === "undefined") {
            return escapeHTML(fullMatch);
        } else {
            return escapeHTML(String(data[dataID]));
        }
    });
};

const QUOTE_RE = /"/g;
const LT_RE = /</g;
const GT_RE = />/g;

function escapeHTML(string = '') {
    return string
        .replace(QUOTE_RE, '&quot;')
        .replace(LT_RE, '&lt;')
        .replace(GT_RE, '&gt;');
};
