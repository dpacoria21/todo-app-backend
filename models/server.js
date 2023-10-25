const express = require('express');
const cors = require('cors');
const authRouter = require('../routes/auth.route');
const { dbConnection } = require('../db/config');

require('dotenv').config();

class Server  {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.connectToDB();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    connectToDB() {
        dbConnection();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Escuchando desde http://localhost:1234');
        });
    }

    routes() {
        this.app.use('/api/auth', authRouter);
    }
}


module.exports = Server;