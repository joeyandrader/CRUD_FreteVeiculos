const createUserToken = require("../Helpers/createUserToken")
const { BuildReturn } = require("../Helpers/Utils")
const Person = require('../Models/UserModel')
const bcrypt = require('bcrypt')
const UserAccess = require('../Models/UserAccess');

const getToken = require('../Helpers/getToken')
const getUserByToken = require('../Helpers/getUserByToken');
const Frete = require("../Models/FreteModel");

module.exports = class PersonController {


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

        const checkUser = await Person.findOne({ where: { email: email } })
        if (checkUser) {
            BuildReturn({ res: res, message: "Este email ja está cadastrado", status: 422 })
            return
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hashSync(password, salt);

        const user = {
            firstname,
            lastname,
            email,
            password: passwordHash
        }

        try {
            const newUser = await Person.create(user);
            await createUserToken(newUser, req, res);
        } catch (error) {
            BuildReturn({ res: res, json: error, status: 500 })
        }
    }

    static async MyShippings(req, res) {
        const token = getToken(req)
        const user = await getUserByToken(token)
        if (!user) {
            return BuildReturn({ res: res, message: "Usuario não encontrado!", status: 422 })
        }

        const shippings = await Frete.findAll({ where: { user_id: user.id } })
        try {
            BuildReturn({ res: res, json: shippings, status: 200 })
        } catch (error) {
            BuildReturn({ res: res, json: error, status: 500 })
        }
    }

    static async RemoveShipping(req, res) {
        const { id } = req.body
        const token = getToken(req)
        const user = await getUserByToken(token)
        if (!id) {
            return BuildReturn({ res: res, message: "Frete is required", status: 422 })
        }
        const checkFrete = await Frete.findOne({ where: { user_id: user.id } })
        if (!checkFrete) {
            return BuildReturn({ res: res, message: "Este frete não existe em sua lista", status: 422 })
        }

        try {
            await Frete.update({ user_id: null, status: "Disponivel" }, { where: { id: id } })
            BuildReturn({ res: res, message: "Frete removido com sucesso!", status: 200 })
        } catch (error) {
            BuildReturn({ res: res, json: error, status: 500 })
        }
    }

    /**
     * Esse metodo so define o usuario logado!
     * Somente para agilizar o processo!
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async byAccess(req, res) {
        const { type } = req.body
        const token = getToken(req)
        const user = await getUserByToken(token)
        if (!user) {
            return BuildReturn({ res: res, message: "Usuario não encontrado!", status: 422 })
        }
        if (!type) {
            BuildReturn({ res: res, message: "Type is required", status: 422 })
            return;
        }

        if (type !== "admin" && type !== "delivery") {
            BuildReturn({ res: res, message: "O usuario so pode ser apenas [admin] ou [delivery]", status: 422 })
            return;
        }

        const checkUserAccess = await UserAccess.findOne({ where: { user_id: user.id } })

        const access = {
            email: user.email,
            type: type,
            user_id: user.id
        }

        try {
            if (checkUserAccess) {
                const byAccess = await UserAccess.update({ type: type }, { where: { user_id: user.id } })
                return BuildReturn({ res: res, message: `[Update] - Seu usario agora é ${type}`, json: access, status: 200 });

            } else {
                const byAccess = await UserAccess.create(access)
                return BuildReturn({ res: res, message: `[Create] - Seu usario agora é ${type}`, json: access, status: 200 });
            }
        } catch (error) {
            BuildReturn({ res: res, json: error.message, status: 500 });
        }
    }
}