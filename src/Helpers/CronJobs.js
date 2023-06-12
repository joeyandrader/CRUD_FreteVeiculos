const CronJob = require('cron').CronJob;
const Utils = require('./Utils');
//models
const Product = require('../Models/ProductModel')
const Vehicle = require('../Models/VehicleModel')
const Frete = require('../Models/FreteModel')


let objectUpdate = {}

/**
 * Update do produto
 */
let updateProduct = new CronJob('* * 6 * * *', async () => {
    let upProduct = await Product.update(objectUpdate, { where: { id: objectUpdate.id } });

    if (upProduct == 1) {
        console.log(`[Success] - [Update] - Product update is succefully ${objectUpdate.name}: ${new Date().toLocaleString()}`)
        let freteUpdate = await Frete.update({ product: objectUpdate.product, product_weight: objectUpdate.weight },
            { where: { product_id: objectUpdate.id } })
        if (freteUpdate) {
            console.log(`[Success] - [Update] - Frete Product update is succefully ${freteUpdate.name}: ${new Date().toLocaleString()}`)
        } else {
            console.log(`[Error] - [Update] - Frete Product update is Failed ${freteUpdate.name}: ${new Date().toLocaleString()}`)
        }
        updateProduct.stop()
    } else {
        console.log(`[Error] - [Update] - Product update is failed ${objectUpdate}: ${new Date().toLocaleString()}`)
        updateProduct.stop()
    }
}, () => {
    console.log('[Success] - [Stop] - Product Update Stopped', new Date().toLocaleString())
}, null, false, "America/Sao_Paulo")

function UpdateProductStart(param) {
    objectUpdate = param
    updateProduct.start();
}

function UpdateProductStop() {
    updateProduct.stop()
}


/**
 * Update do veiculo
 */
let updateVehicle = new CronJob('* * 6 * * *', async () => {
    let upVehicle = await Vehicle.update(objectUpdate, { where: { id: objectUpdate.id } });

    if (upVehicle == 1) {
        console.log(`[Success] - [Update] - Vehicle update is succefully ${objectUpdate.name}: ${new Date().toLocaleString()}`)
        let freteUpdate = await Frete.update({ vehicle: objectUpdate.vehicle, vehicle_weight: objectUpdate.weight },
            { where: { vehicle_id: objectUpdate.id } })
        if (freteUpdate) {
            console.log(`[Success] - [Update] - Frete Vehicle update is succefully ${freteUpdate.name}: ${new Date().toLocaleString()}`)
        } else {
            console.log(`[Error] - [Update] - Frete Vehicle update is Failed ${freteUpdate.name}: ${new Date().toLocaleString()}`)
        }
        updateVehicle.stop()
    } else {
        console.log(`[Error] - [Update] - Vehicle update is failed ${objectUpdate}: ${new Date().toLocaleString()}`)
        updateVehicle.stop()
    }
}, () => {
    console.log('[Success] - [Stop] - Vehicle Update Stopped: ', new Date().toLocaleString())
}, null, false, "America/Sao_Paulo")

function UpdateVehicleStart(param) {
    objectUpdate = param
    updateVehicle.start();
}

function UpdateVehicleStop() {
    updateVehicle.stop()
}


let updateFrete = new CronJob('* * 6 * * *', async () => {

    let freteUpdate = await Frete.update(objectUpdate, {
        where: {
            id: objectUpdate.id
        }
    })

    if (freteUpdate == 1) {
        console.log(`[Success] - [Update] - Frete update is succefully ${freteUpdate.name}: ${new Date().toLocaleString()}`)
        updateFrete.stop()
    } else {
        console.log(`[Error] - [Update] - Frete update is failed ${freteUpdate.name}: ${new Date().toLocaleString()}`)
        updateFrete.stop()
    }
}, () => {
    console.log(`[Success] - [Stop] - Frete update stoped: ${new Date().toLocaleString()}`)
}, null, false, "America/Sao_Paulo")

function UpdateFreteStart(param) {
    objectUpdate = param
    updateFrete.start()
}

function UpdateFreteStop() {
    objectUpdate.stop()
}


module.exports = {
    UpdateProductStart,
    UpdateProductStop,
    UpdateVehicleStart,
    UpdateVehicleStop,
    UpdateFreteStart,
    UpdateFreteStop
}