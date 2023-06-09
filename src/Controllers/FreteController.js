const { BuildReturn } = require("../Helpers/Utils")
const Frete = require("../Models/FreteModel");
const Product = require("../Models/ProductModel");
const Vehicle = require("../Models/VehicleModel");
const HistoryFrete = require("../Models/HistoryShippingModel")

//Helpers
const getToken = require("../Helpers/getToken");
const getUserByToken = require('../Helpers/getUserByToken');

module.exports = class FreteController {

    static async ListFrete(req, res) {

        const listFrete = await Frete.findAll({ where: { status: "Disponivel" } });

        try {
            BuildReturn({
                res: res,
                json: listFrete,
                status: 200
            })
        } catch (error) {
            BuildReturn({
                res: res,
                json: error,
                status: 500
            })
        }
    }

    static async RegisterFrete(req, res) {
        const { name, productId, vehicleId, frete_km } = req.body
        if (!name) {
            return BuildReturn({ res: res, message: "Name is required", status: 422 })
        }
        if (!productId) {
            return BuildReturn({ res: res, message: "Product is required", status: 422 })
        }
        if (!vehicleId) {
            return BuildReturn({ res: res, message: "Vehicle is required", status: 422 })
        }
        if (!frete_km) {
            return BuildReturn({ res: res, message: "KM is required", status: 422 })
        }

        //Busca pelo produto correspondente
        const findProduct = await Product.findOne({ where: { id: productId } });
        if (!findProduct) {
            return BuildReturn({ res: res, message: "Product not found", status: 422 })
        }

        //Busca pelo veiculo correspondente
        const findVehicle = await Vehicle.findOne({ where: { id: vehicleId } });
        if (!findVehicle) {
            return BuildReturn({ res: res, message: "Product not found", status: 422 })
        }

        //Calcula o frete, KM * PesoProduto * PesoVeiculo
        const calcFrete = frete_km * findProduct.weight * findVehicle.weight

        const newFrete = {
            name,
            product: findProduct.name,
            product_weight: findProduct.weight,
            vehicle: findVehicle.name,
            vehicle_weight: findVehicle.weight,
            frete_km,
            frete_price: calcFrete,
            product_id: findProduct.id,
            vehicle_id: findVehicle.id
        }

        try {
            const createFrete = await Frete.create(newFrete)
            BuildReturn({ res: res, message: "Frete criado com sucesso!", json: createFrete, status: 201 })
        } catch (error) {
            BuildReturn({ res: res, json: error, status: 500 })
        }
    }

    static async RequestShipping(req, res) {

        const { id } = req.body

        const token = getToken(req)
        const user = await getUserByToken(token);
        if (!user) {
            return BuildReturn({ res: res, message: "Usuario não encontrado!", status: 422 })
        }

        const findFrete = await Frete.findByPk(id)

        if (!findFrete) {
            return BuildReturn({ res: res, message: "Erro ao solicitar o frete", status: 422 })
        }

        if (findFrete.user_id == user.id) {
            return BuildReturn({ res: res, message: "Você ja solicitou este frete", status: 422 })
        }

        if (findFrete.user_id != null) {
            return BuildReturn({ res: res, message: "Este frete ja foi solicitado por outro entregador", status: 422 })
        }

        const createHistory = {
            name: findFrete.name,
            product: findFrete.product,
            vehicle: findFrete.vehicle,
            frete_id: findFrete.id,
            user_id: user.id,
            user_name: user.firstname + " " + user.lastname
        }

        try {
            await Frete.update({
                user_id: user.id,
                status: 'Pending'
            }, {
                where: { id: findFrete.id }
            })
            await HistoryFrete.create(createHistory);
            BuildReturn({ res: res, message: "Frete atribuido com sucesso!", status: 200 })
        } catch (error) {
            BuildReturn({ res: res, json: error, status: 500 })
        }

    }


}