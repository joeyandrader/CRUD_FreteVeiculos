const { BuildReturn } = require("../Helpers/Utils")
const Frete = require("../Models/FreteModel");
const Product = require("../Models/ProductModel");
const Vehicle = require("../Models/VehicleModel");
const HistoryFrete = require("../Models/HistoryShippingModel")

//Helpers
const getToken = require("../Helpers/getToken");
const getUserByToken = require('../Helpers/getUserByToken');
const { AlterFreteStatusTime } = require('../Helpers/MyCronnTime');
const { UpdateFreteStart } = require("../Helpers/CronJobs");

module.exports = class FreteController {

    static async ListFrete(req, res) {

        const listFrete = await Frete.findAll({ where: { status: "Disponivel" } });
        let objectReturn = []
        listFrete.forEach(element => {
            objectReturn.push({
                id: element.id,
                name: element.name,
                product: element.product,
                product_weight: element.product_weight,
                vehicle: element.vehicle,
                vehicle_weight: element.vehicle_weight,
                frete_km: element.frete_km,
                frete_price: element.frete_km * element.product_weight * element.vehicle_weight,
                status: element.status,
                product_id: element.product_id,
                vehicle_id: element.vehicle_id,
                user_id: element.user_id
            })
        });
        try {
            BuildReturn({
                res: res,
                json: objectReturn,
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

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
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
                status: 'Pendente'
            }, {
                where: { id: findFrete.id }
            })
            await HistoryFrete.create(createHistory);
            // AlterStatusFreteStart({ id: id })
            AlterFreteStatusTime({ id: id })
            BuildReturn({ res: res, message: "Frete atribuido com sucesso!", status: 200 })
        } catch (error) {
            BuildReturn({ res: res, json: error, status: 500 })
        }

    }

    static async UpdateFrete(req, res) {
        const { id, name, productId, vehicleId, frete_km, status } = req.body

        if (!name) {
            return BuildReturn({ res: res, message: "Name is required", status: 422 })
        }
        if (!productId) {
            return BuildReturn({ res: res, message: "Name is required", status: 422 })
        }
        if (!vehicleId) {
            return BuildReturn({ res: res, message: "Name is required", status: 422 })
        }
        if (!frete_km) {
            return BuildReturn({ res: res, message: "Name is required", status: 422 })
        }

        let findFrete = await Frete.findByPk(id)
        if (!findFrete) {
            return BuildReturn({ res: res, message: "Shipping not found", status: 422 })
        }

        let findProduct = await Product.findByPk(findFrete.product_id)
        if (!findProduct) {
            return BuildReturn({ res: res, message: "Product not found", status: 422 })
        }
        let findVehicle = await Vehicle.findByPk(findFrete.vehicle_id)
        if (!findVehicle) {
            return BuildReturn({ res: res, message: "Vehicle not found", status: 422 })
        }

        let calcFrete = frete_km * findProduct.weight * findVehicle.weight

        const newUpdateFrete = {
            id,
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
            UpdateFreteStart(newUpdateFrete);
            BuildReturn({ res: res, message: "Frete Editado com sucesso!", json: newUpdateFrete, status: 200 })
        } catch (error) {
            BuildReturn({ res: res, json: error, status: 500 })
        }
    }


}