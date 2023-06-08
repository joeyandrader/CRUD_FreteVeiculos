const Sequelize = require('sequelize')
const connecDB = require('../DataBase/ConnectDB')

const Product = connecDB.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    weight: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING
    }
})

// Product.sync({ force: true })

module.exports = Product