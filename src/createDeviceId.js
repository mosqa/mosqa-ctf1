const crypto = require('crypto');
const salt = 'mosqa-ctf-smugglers-inspired';

module.exports = () => {
    return crypto.createHash('md5')
        .update(String(Date.now() + Math.random()) + salt)
        .digest('hex');
};
