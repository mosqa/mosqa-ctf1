module.exports = (req) => {
    if (req.user.name) {
        return req.user.name;
    }

    const deviceId = req.cookies.device_id;
    return `${ deviceId.slice(0, 5) }...${ deviceId(-5) }`
};

