const express = require('express');
const { createJWT } = require('../helpers/createJWT');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/',[
    check('email', 'No es un email valido').isEmail(),
    check('password', 'La contraseña debe de tener minimo 6 caracteres').isLength({min: 6}),
    validarCampos,
], async(req, res) => {
    const {email, password} = req.body;
    try {
        const jwt =  await createJWT(email, password);
        return res.status(200).json({
            msg: 'obtenido con exito',
            status: 'ok',
            token: jwt,
        });
    }catch(err) {
        console.log(err);
    }
});

router.post('/register', [
    check('name', 'el nombre es obligatorio').notEmpty(),
    check('lastName', 'el lastName es obligatorio').notEmpty(),
    check('email', 'No es un email valido').isEmail(),
    check('password', 'La contraseña debe de tener minimo 6 caracteres').isLength({min: 6}),
    validarCampos,
], async(req, res) => {
    const {name, lastName, email, password} = req.body;    
    const jwt =  await createJWT(email, password);
    return res.status(201).json({
        name,
        lastName,
        email,
        password,
        token: jwt,
        status: 'ok'
    });
});

router.post('/verify', (req, res) => {
    const {username, password, token} = req.body;
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    try{
        const isVerify = jwt.verify(token, jwtSecretKey);
        console.log(isVerify);
        if(isVerify) {
            return res.status(201).json({
                logged: true,
                username,
                password
            });
        }else {
            throw new Error('No es valido el token');
        }
    }catch(err) {
        return res.status(400).json({
            logged: false,
        });
    }
});

module.exports = router;