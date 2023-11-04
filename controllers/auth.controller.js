const { createJWT } = require('../helpers/createJWT');
const User = require('../models/user');
const bcryp = require('bcryptjs');

const userRegister = async(req, res) => {
    
    const {name, email, password} = req.body;
    
    try {   
        let user = await User.findOne({email: email});
        if(user) {
            return res.status(401).json({
                ok: false,
                msg: 'Usuario ya existe en la DB'
            });
        }

        user = new User(req.body);


        const salt = bcryp.genSaltSync();
        user.password = bcryp.hashSync(password, salt);
         

        await user.save();
    
        const jwt =  await createJWT(name, user.uid);
        return res.status(201).json({
            ok: true,
            user,
            token: jwt,
        });
    }catch(err) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
            error: err
        });
    }
};

const userLogin = async(req, res) => {
    const {email, password} = req.body;
    try {

        let user = await User.findOne({email});

        if(!user) {
            return res.status(401).json({
                ok: false,
                msg: 'Usuario no existe en la DB'
            });
        }

        const isVirifyPassword = bcryp.compareSync(password, user.password);
        if(!isVirifyPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }
        console.log(user);
        const jwt =  await createJWT(user.name, user.uid);
        return res.status(200).json({
            ok: true,
            user,
            token: jwt,
        });
    }catch(err) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
            error: err
        });
    }
};

const userRenew = async(req, res) => {
    const name = req.name;
    const uid = req.uid;

    const newJWT = await createJWT(name, uid);

    return res.json({
        ok: true,
        name,
        uid,
        newJWT
    });
};

module.exports = {
    userLogin,
    userRegister,
    userRenew
};
