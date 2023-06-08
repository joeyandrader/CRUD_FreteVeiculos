// Helpers
const { BuildReturn } = require("../Helpers/Utils")

//Dependencies
const bcrypt = require('bcrypt')

//Models
const Person = require("../Models/PersonModel")

module.exports = class IndexController {


    /**
     * @swagger
     * /:
     *  get:
     *     description: Inicio da aplicação
     *     responses:
     *           '200':
     *              description: Sucesso
     *           '500':
     *              description: Bad Request
     */
    static async Index(req, res) {
        try {
            BuildReturn({ res: res, status: 200, json: "Hello World Docker" })
        } catch (error) {
            BuildReturn({ res: res, status: 500, json: error })
        }
    }

    /**
     * @swagger
     * /login:
     *     post:
     *       summary: Rota para efetuar o login no sistema
     *       parameters:
     *       - in: path
     *         name: email
     *         required: true
     *         description: Email
     *         schema:
     *           type: string
     *       - in: path
     *         name: password
     *         required: true
     *         description: Senha
     *         schema:
     *           type: string
     *       responses:
     *          '200':
     *              description: Logado com sucesso!
     *          '422':
     *              description: Dados invalidos ou não preenchidos
     *          '500':
     *              description: Erro ao requisitar API   
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

        const checkUser = await Person.findOne({ where: { email: email } })
        const decryptPassword = await bcrypt.compareSync(checkUser.password, password);
        if (checkUser) {
            
        }
    }

}