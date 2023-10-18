const jwt = require('jsonwebtoken');

const createJWT = (email, password) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const payload = {
        email,
        password
    };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, jwtSecretKey, {
            expiresIn: '2h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo crear el token');
            }
            resolve(token);
        });
    });
    
};

module.exports = {
    createJWT
};