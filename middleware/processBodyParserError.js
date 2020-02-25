module.exports = (error, req, res, next) => {
    if (error) {
        // request too large

        const winCases = [ 'HTTP_413' ];
        const currentFlags = req.user.flags;
        const nextFlags = [ ...currentFlags ];
        winCases.forEach((id) => {
            const flag = currentFlags.find((flag) => flag.id === id);
            if (!flag) {
                nextFlags.push({ id: id, request_id: 'TODO', timestamp: Date.now() });
            }
        });
        if (nextFlags.length > currentFlags.length) {
            req.db.collection('users')
                .updateOne(
                    { id: req.deviceId },
                    { $set: { flags: nextFlags, flags_length: nextFlags.length } },
                )
                .then(() => {
                    res.statusCode = 302;
                    res.setHeader('location', '/#ctf');
                    res.end();
                })
                .catch((error) => {
                    iAmTeapot(req, res, error);
                });
        } else {
            res.statusCode = 302;
            res.setHeader('location', '/#ctf');
            res.end();
        }
        return;
    }

    next();
};
