module.exports = (req, res, err) => {
    console.error('ERROR', err.toString(), '\n', err.stack);
    res.status(502).send(`Fatal error. Sorry.`);
};
