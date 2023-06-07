const { BuildReturn } = require("../Helpers/Util")
const Person = require('../Models/PersonModel')
const bcrypt = require('bcrypt')


module.exports = class PersonController {

    /**
     * @swagger
     * /user/registerUser:
     *   post:
     *     summary: Registra um usuario no sistema
     *     parameters:
     *       - in: path
     *         name: firstname
     *         required: true
     *         description: Primeiro nome do usuario
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Sucesso
     */
    static async RegisterUser(req, res) {
        const { firstname, lastname, email, password, confirmPassword } = req.body

        if (!firstname) {
            BuildReturn({ res: res, message: "The firstname is required", status: 422 })
            return
        }
        if (!lastname) {
            BuildReturn({ res: res, message: "The lastname is required", status: 422 })
            return
        }
        if (!email) {
            BuildReturn({ res: res, message: "The email is required", status: 422 })
            return
        }
        if (!password) {
            BuildReturn({ res: res, message: "The password is required", status: 422 })
            return
        }
        if (!confirmPassword) {
            BuildReturn({ res: res, message: "The confirm password is required", status: 422 })
            return
        }

        if (password !== confirmPassword) {
            BuildReturn({ res: res, message: "The password not match with confirm password", status: 422 })
            return
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hashSync(password, salt);

        const newUser = {
            firstname,
            lastname,
            email,
            password: passwordHash
        }

        try {
            await Person.create(newUser);
            BuildReturn({ res: res, json: newUser, status: 201, message: "Usuario cadastrado com sucesso!" })
        } catch (error) {
            console.log(error)
            BuildReturn({ res: res, json: error, status: 500 })
        }
    }
}