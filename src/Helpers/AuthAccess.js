const jwt = require('jsonwebtoken')
const getToken = require('./getToken');
const { BuildReturn } = require('./Utils');
const UserAccess = require('../Models/UserAccess');

module.exports = {
    VerifyToken: (req, res, next) => {
        if (!req.headers.authorization) {
            return BuildReturn({ res: res, status: 401, json: "Acesso Negado!" })
        }

        const token = getToken(req)

        if (!token) {
            return BuildReturn({ res: res, status: 401, json: "Acesso Negado!" })
        }

        try {
            const verified = jwt.verify(token, process.env.KEY_JWT)
            req.user = verified;
            next();
        } catch (error) {
            return BuildReturn({ res: res, status: 400, json: "Token Invalido!" })
        }
    },
    AdminAuth: async (req, res, next) => {
        if (!req.headers.authorization) {
            return BuildReturn({ res: res, status: 401, json: "Acesso Negado!" })
        }

        const token = getToken(req)

        if (!token) {
            return BuildReturn({ res: res, status: 401, json: "Acesso Negado!" })
        }

        try {
            const verified = jwt.verify(token, process.env.KEY_JWT)
            req.user = verified;
            const userAccess = await UserAccess.findOne({ where: { user_id: verified.id } })
            if (userAccess) {
                if (userAccess.type == "admin") {
                    next();
                } else {
                    return BuildReturn({ res: res, status: 400, message: "Ops! Somente Administradores" })
                }
            } else {
                return BuildReturn({ res: res, status: 400, message: "Ops! Você não tem permissão" })
            }

        } catch (error) {
            return BuildReturn({ res: res, status: 400, json: "Token Invalido!" })
        }
    },
    DeliveryAuth: async (req, res, next) => {
        if (!req.headers.authorization) {
            return BuildReturn({ res: res, status: 401, json: "Acesso Negado!" })
        }

        const token = getToken(req)

        if (!token) {
            return BuildReturn({ res: res, status: 401, json: "Acesso Negado!" })
        }

        try {
            const verified = jwt.verify(token, process.env.KEY_JWT)
            req.user = verified;
            const userAccess = await UserAccess.findOne({ where: { user_id: verified.id } })
            if (userAccess) {
                if (userAccess.type == "delivery" || userAccess.type == "admin") {
                    next();
                } else {
                    return BuildReturn({ res: res, status: 400, message: "Ops! Somente Entregadores ou administradores podem ver essa pagina" })
                }
            } else {
                return BuildReturn({ res: res, status: 400, message: "Ops! Você não tem permissão" })
            }

        } catch (error) {
            return BuildReturn({ res: res, status: 400, json: "Token Invalido!" })
        }
    }
}

// module.exports = VerifyToken