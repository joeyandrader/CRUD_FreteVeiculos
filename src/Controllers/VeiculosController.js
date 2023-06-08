const { BuildReturn } = require("../Helpers/Utils")

module.exports = class VeiculosController {

    static async Index(req, res) {
        BuildReturn({
            res: res,
            json: "Lista de todos os veiculos cadastrados",
            status: 200
        })
    }
}