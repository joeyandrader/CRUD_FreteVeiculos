// Helpers
const { BuildReturn } = require("../Helpers/Utils")
const { UpdateUserNameStart, UpdateUserNameStop } = require('../Helpers/CronJobs');

//Dependencies
const bcrypt = require('bcrypt')

//Models
const Person = require("../Models/UserModel")
const createUserToken = require("../Helpers/createUserToken")

module.exports = class IndexController {

    /**
     * Rota inicial da aplicação
     * @param {*} req 
     * @param {*} res 
     */
    static async Index(req, res) {


        try {
            BuildReturn({ res: res, status: 200, json: "Hello World Docker" })
        } catch (error) {
            BuildReturn({ res: res, status: 500, json: error })
        }
    }


    /**
     * Rota de login
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async Login(req, res) {
        const { email, password } = req.body
        if (!email) {
            BuildReturn({ res: res, status: 422, message: "Email is required" })
            return
        }
        if (!password) {
            BuildReturn({ res: res, status: 422, message: "Password is required" })
            return
        }

        const user = await Person.findOne({ where: { email: email } })
        //Checa se o usuario email existe
        if (!user) {
            BuildReturn({ res: res, status: 422, message: "Não Existe um usuario com este email" })
            return
        }

        //Checa se a senha está correta
        const checkPassword = await bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            BuildReturn({ res: res, status: 422, message: "Email ou senha incorreto!" })
            return
        }

        //apos checar se existe o usuario ou senha errada, caso exista ele gera um novo token com a função
        try {
            await createUserToken(user, req, res);
        } catch (error) {
            BuildReturn({ res: res, status: 500, json: error })
        }
    }

}