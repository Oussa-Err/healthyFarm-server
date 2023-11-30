const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({ path: "./.env" })

const server = require("./app.js")



mongoose.connect(process.env.MONGO_CONN, { useUnifiedTopology: true })
    .then(connection => {
        console.log("DB connection successful")
    }).catch(err => {
        console.log(`DB connection failed \n${err}`)
    })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

server.listen(process.env.PORT || 8080, () => {
    console.log("server has started...")
})

