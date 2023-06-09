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
        type: Sequelize.FLOAT,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
})


// Product.sync({ force: true })

module.exports = Product