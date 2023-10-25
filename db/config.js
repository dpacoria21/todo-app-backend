const mongoose = require('mongoose');

const dbConnection = () => {
    try{
        mongoose.connect(process.env.DBApi, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
            
        console.log('DB Online!');
    }catch(err) {
        console.log(err);
        throw new Error('Error a la hora de iniciarlizar en la base de datos');
    }
};

module.exports = {
    dbConnection
};