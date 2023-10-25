const express = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const { userLogin, userRegister, userRenew } = require('../controllers/auth.controller');
const router = express.Router();

router.post('/',[
    check('email', 'No es un email valido').isEmail(),
    check('password', 'La contraseña debe de tener minimo 6 caracteres').isLength({min: 6}),
    validarCampos,
], userLogin);

router.post('/register', [
    check('name', 'el nombre es obligatorio').notEmpty(),
    check('email', 'No es un email valido').isEmail(),
    check('password', 'La contraseña debe de tener minimo 6 caracteres').isLength({min: 6}),
    validarCampos,
], userRegister);

router.get('/renew', validarJWT, userRenew);



module.exports = router;