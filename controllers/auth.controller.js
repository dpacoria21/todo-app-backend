const { createJWT } = require('../helpers/createJWT');
const User = require('../models/user');

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
    
        await user.save();
    
        const jwt =  await createJWT(email, password);
        return res.status(201).json({
            name,
            email,
            password,
            token: jwt,
            status: 'ok',
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
        const jwt =  await createJWT(email, password);
        return res.status(200).json({
            msg: 'obtenido con exito',
            status: 'ok',
            token: jwt,
        });
    }catch(err) {
        console.log(err);
    }
};

const userRenew = async(req, res) => {
    const email = req.email;
    const password = req.password;

    const newJWT = await createJWT(email, password);

    res.json({
        ok: true,
        email,
        password,
        newJWT
    });
};

module.exports = {
    userLogin,
    userRegister,
    userRenew
};
