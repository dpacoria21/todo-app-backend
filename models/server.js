const express = require('express');
const authRouter = require('../routes/auth.route');

require('dotenv').config();

class Server  {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Escuchando desde http://localhost:1234');
        });
    }

    routes() {
        this.app.use('/auth', authRouter);
    }
}


module.exports = Server;