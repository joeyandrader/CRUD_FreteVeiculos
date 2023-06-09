const Sequelize = require('sequelize')
const connecDB = require('../DataBase/ConnectDB')

//Models
const product = require('./ProductModel');
const vehicle = require('./VehicleModel');
const user = require('./UserModel');


const Frete = connecDB.define('frete', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    product: {
        type: Sequelize.STRING,
        allowNull: false
    },
    product_weight: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    vehicle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    vehicle_weight: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    frete_km: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    frete_price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Disponivel'
    }
})


Frete.belongsTo(product, {
    foreignKey: 'product_id',
    as: 'Product'
})

Frete.belongsTo(vehicle, {
    foreignKey: 'vehicle_id',
    as: 'Vehicle'
})

Frete.belongsTo(user, {
    foreignKey: 'user_id',
    as: 'User'
})

// Frete.sync({ force: true })

module.exports = Frete