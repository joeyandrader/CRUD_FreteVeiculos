const { BuildReturn } = require("../Helpers/Utils")
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
}