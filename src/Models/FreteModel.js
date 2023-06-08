const Sequelize = require('sequelize')
const connecDB = require('../DataBase/ConnectDB')

const Frete = connecDB.define('frete', {
    produto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    vehicle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    frete_price: {
        type: Sequelize.REAL,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Pending'
    }
})

// Frete.sync({ force: true })

module.exports = Frete