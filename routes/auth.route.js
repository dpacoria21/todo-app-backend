const express = require('express');
const jwt = require('jsonwebtoken');
const { createJWT } = require('../helpers/createJWT');
const router = express.Router();

router.post('/', async(req, res) => {

    const {email, password} = req.body;
    const jwt =  await createJWT(email, password);
    res.status(200).json({
        msg: 'obtenido con exito',
        status: 'ok',
        token: jwt,
    });
});

router.post('/register', (req, res) => {
    const {name, lastName, email, password} = req.body;    

    res.status(201).json({
        name,
        lastName,
        email,
        password,
        status: 'ok'
    });
});

router.post('/verify', (req, res) => {
    const {username, password, token} = req.body;
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    try{
        const isVerify = jwt.verify(token, jwtSecretKey);
        if(isVerify) {
            res.status(201).json({
                logged: true,
                username,
                password
            });
        }else {
            throw new Error('No es valido el token');
        }
    }catch(err) {
        res.status(400).json({
            logged: false,
        });
    }
});

module.exports = router;