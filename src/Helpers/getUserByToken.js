const jwt = require("jsonwebtoken");
const Person = require("../Models/UserModel");
const { BuildReturn } = require("./Utils");

const getUserByToken = async (token) => {
    //verifica se o token existe no headers
    if (!token) {
        return BuildReturn({ res: res, status: 401, message: "Acesso Negado!" })
    }

    //Variavel decoded decifra o token passado onde retorna as info do usuario
    const decoded = jwt.verify(token, process.env.KEY_JWT);

    //extrai o ID do decoded
    const userId = decoded.id

    //verifica se o usuario é igual a do ID do token
    const user = await Person.findOne({ where: { id: userId } })

    //retorna o usuario
    return user;
}

module.exports = getUserByToken