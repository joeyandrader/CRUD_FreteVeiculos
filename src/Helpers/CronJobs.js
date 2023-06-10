const CronJob = require('cron').CronJob;
const Utils = require('./Utils');
//models
const Product = require('../Models/ProductModel')
const Vehicle = require('../Models/VehicleModel')
const Frete = require('../Models/FreteModel')

let objectUpdate = {}
console.log(objectUpdate)

let updateProduct = new CronJob('*/6 * * * * *', async () => {
    // let upProduct = await Product.update(objectUpdate, { where: { id: objectUpdate.id } });
    // let findVehicle = await Vehicle.findOne({})
    // let upFrete = await Frete.update({})
    await Utils.updateProductCronJob(objectUpdate)
    // if (upProduct == 1) {
    //     console.log(`[Success] - [Update] - Product update is succefully ${objectUpdate.name}`)
    //     updateProduct.stop()
    // } else {
    //     console.log(`[Fail] - [Update] - Product update is failed ${objectUpdate}`)
    //     updateProduct.stop()
    // }
}, () => {
    console.log('[Success] - [Stop] - Product Update Stopped')
}, null, false, "America/Sao_Paulo")

function UpdateProductStart(param) {
    objectUpdate = param
    updateProduct.start();
}

function UpdateProductStop() {
    updateProduct.stop()
}

module.exports = {
    UpdateProductStart,
    UpdateProductStop
}