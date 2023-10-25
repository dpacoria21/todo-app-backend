const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        console.log(token);
        const {name, uid} = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.name = name;
        req.uid = uid;

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