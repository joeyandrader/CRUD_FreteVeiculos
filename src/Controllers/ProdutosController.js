const { BuildReturn } = require("../Helpers/Utils")


module.exports = class ProdutosController {

    static async Index(req, res) {
        BuildReturn({
            res: res,
            json: "Lista todos os produtos",
            status: 200
        })
    }
    
}