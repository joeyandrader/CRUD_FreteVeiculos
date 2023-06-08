const jwt = require('jsonwebtoken');
const { BuildReturn } = require('./Utils');

const createUserToken = async (user, req, res) => {

    //Cria o token
    const token = jwt.sign({
        name: user.name,
        email: user.email,
        id: user.id
    }, process.env.KEY_JWT)

    //Retorna o token para função
    BuildReturn({
        res: res,
        message: "Você está autenticado!",
        json: {
            token: token,
            email: user.email,
            userId: user.id
        },
        status: 200
    })
}

module.exports = createUserToken