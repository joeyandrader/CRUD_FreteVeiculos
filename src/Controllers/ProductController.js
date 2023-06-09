const { BuildReturn } = require("../Helpers/Utils")
const Product = require("../Models/ProductModel");

module.exports = class ProductController {

    /**
     * Lista todos os produtos cadastrado
     * @param {*} req 
     * @param {*} res 
     */
    static async ListProduct(req, res) {
        try {
            const listProduct = await Product.findAll();
            BuildReturn({ res: res, json: listProduct, status: 200 })
        } catch (error) {
            BuildReturn({
                res: res,
                json: error,
                status: 500
            })
        }
    }

    /**
     * Registra novo produto
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async RegisterProduct(req, res) {
        const { name, description, weight, image } = req.body
        if (!name) {
            return BuildReturn({ res: res, message: "Name is required", status: 422 })
        }
        if (!description) {
            return BuildReturn({ res: res, message: "Description is required", status: 422 })
        }
        if (!weight) {
            return BuildReturn({ res: res, message: "Weight is required", status: 422 })
        }
        if (!image) {
            return BuildReturn({ res: res, message: "Image is required", status: 422 })
        }

        const newProduct = {
            name,
            description,
            weight,
            image
        }

        try {
            const product = await Product.create(newProduct);
            BuildReturn({ res: res, json: product, message: "Produto criado com sucesso!", status: 201 })
        } catch (error) {
            BuildReturn({ res: res, json: error, status: 500 })
        }
    }

    static async RemoveProduct(req, res) {
        const id = req.params.id

        const checkProduct = await Product.findByPk(id)
        if (!checkProduct) {
            return BuildReturn({ res: res, message: "Produto não encontrado!", status: 422 })
        }

        try {
            await Product.destroy({ where: { id: id } })
            BuildReturn({ res: res, message: "Produto removido com sucesso!", status: 200 })
        } catch (error) {
            BuildReturn({ res: res, json: error.message, status: 500 })
        }
    }

}