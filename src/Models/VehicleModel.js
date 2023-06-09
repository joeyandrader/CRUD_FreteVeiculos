const Sequelize = require('sequelize')
const connecDB = require('../DataBase/ConnectDB')


const Vehicle = connecDB.define('vehicle', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    weight: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false
    },
    brand: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
})

// Vehicle.sync({ force: true })

module.exports = Vehicle