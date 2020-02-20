const createRoomId = require('./createRoomId');

module.exports = (req) => {
    const roomId = createRoomId();
    const name = req.body.name;
    const sexMy = req.body.sexMy;
    const sexPartner = req.body.sexPartner;
    const deviceId = req.cookies.device_id;
    const data = {
        roomId: roomId,
        deviceId: deviceId,
        name: name,
        sexMy: sexMy,
        sexPartner: sexPartner,
        anketa: [],
        isDraft: true,
    };

    const db = req.db;
    const anketaCollection = db.collection('anketa');
    return anketaCollection.insertOne(data);
};
