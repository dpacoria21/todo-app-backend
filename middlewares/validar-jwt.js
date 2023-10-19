const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    const {token} = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const {email, password} = jwt.verify(token, process.env.JWT_SECRET_KEY);

        console.log({email, password});
        req.email = email;
        req.password = password;

    }catch(err) {
        console.log(err);
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

    next();
};

module.exports = validarJWT;