const mongoose = require('mongoose')
const connect = async () => {
    if (!process.env.Mongop) return console.log('[!!!] Unable to connect to database: no URL supplied');
    try {
        const db = await mongoose.connect(process.env.Mongop, { connectTimeoutMS: 5000 });
        const socket = db.connections[0];
        console.log(`Connected to the database at ${socket.host}:${socket.port}`);
        return db;
    } catch (e) {
        console.log(`[!!!] Unable to connect to the database! ${e.message}`, e);
    }
}
module.exports = connect
