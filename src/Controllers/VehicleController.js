const { UpdateVehicleStart } = require("../Helpers/CronJobs");
const { BuildReturn } = require("../Helpers/Utils")
//Models
const Frete = require("../Models/FreteModel")
const Vehicle = require('../Models/VehicleModel');

module.exports = class VehicleController {

    static async ListVehicle(req, res) {
        try {
            const list = await Vehicle.findAll();
            BuildReturn({
                res: res,
                json: list,
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

    static async RegisterVehicle(req, res) {
        const { name, description, weight, model, brand, image } = req.body
        if (!name) {
            return BuildReturn({ res: res, message: "Name is required!", status: 422 })
        }
        if (!description) {
            return BuildReturn({ res: res, message: "Description is required!", status: 422 })
        }
        if (!weight) {
            return BuildReturn({ res: res, message: "Weight is required!", status: 422 })
        }
        if (!model) {
            return BuildReturn({ res: res, message: "Model is required!", status: 422 })
        }
        if (!brand) {
            return BuildReturn({ res: res, message: "Brand is required!", status: 422 })
        }
        if (!image) {
            return BuildReturn({ res: res, message: "Image is required!", status: 422 })
        }

        const newVehicle = {
            name,
            description,
            weight,
            model,
            brand,
            image
        }

        try {
            const vehicle = await Vehicle.create(newVehicle);
            BuildReturn({ res: res, message: "Veiculo criado som sucesso!", json: vehicle, status: 201 })
        } catch (error) {
            BuildReturn({ res: res, json: error, status: 500 })
        }
    }

    static async UpdateVehicle(req, res) {
        const { id, name, description, weight, model, brand, image } = req.body
        if (!name) {
            return BuildReturn({ res: res, message: "Name is required", status: 422 })
        }
        if (!description) {
            return BuildReturn({ res: res, message: "Description is required", status: 422 })
        }
        if (!weight) {
            return BuildReturn({ res: res, message: "Weight is required", status: 422 })
        }
        if (!model) {
            return BuildReturn({ res: res, message: "Model is required", status: 422 })
        }
        if (!brand) {
            return BuildReturn({ res: res, message: "Brand is required", status: 422 })
        }
        if (!image) {
            return BuildReturn({ res: res, message: "Image is required", status: 422 })
        }

        const checkFretePending = await Frete.findOne({ where: { vehicle_id: id, status: "Pending" } })
        if (checkFretePending) {
            return BuildReturn({ res: res, message: "Esse veiculo não pode ser alterado, por que está com status de frete pendente", status: 422 })
        }
        const checkFreteApproved = await Frete.findOne({ where: { vehicle_id: id, status: "Aprovado" } })
        if (checkFreteApproved) {
            return BuildReturn({ res: res, message: "Esse veiculo não pode ser alterado, por que está com status de frete Aprovado", status: 422 })
        }

        const updateProduct = ({
            id: id,
            name,
            description,
            model,
            brand,
            weight,
            image
        })

        try {
            UpdateVehicleStart(updateProduct)
            BuildReturn({ res: res, message: "Produto atualizado com sucesso!", json: updateProduct, status: 200 })
        } catch (error) {
            BuildReturn({ res: res, json: error, status: 500 })
        }
    }
}