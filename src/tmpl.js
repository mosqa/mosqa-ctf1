const escapeHTML = require('./escapeHTML');

module.exports = (text, data) => {
    return text.replace(/{{([^{]+)}}/g, function(fullMatch, dataID) {
        const escape = !dataID.startsWith('!');
        const key = dataID.startsWith('!') ? dataID.slice(1) : dataID;

        if (typeof data[key] === "undefined") {
            return escapeHTML(fullMatch);
        } else if (escape) {
            return escapeHTML(String(data[key]));
        } else {
            return String(data[key]);
        }
    });
};
