module.exports = (req, res, err) => {
    res.status(502).send(`Fatal error: ${ err.toString() }\n${ err.stack }`);
};
