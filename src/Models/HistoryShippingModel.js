const Sequelize = require('sequelize')
const connecDB = require('../DataBase/ConnectDB')

const frete = require('./FreteModel')
const user = require('./UserModel')

const HistoryFrete = connecDB.define('history_frete', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    product: {
        type: Sequelize.STRING,
        allowNull: false
    },
    vehicle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_name: {
        type: Sequelize.STRING
    }
})


HistoryFrete.belongsTo(frete, {
    foreignKey: 'frete_id',
    as: 'frete'
})

HistoryFrete.belongsTo(user, {
    foreignKey: 'user_id',
    as: 'user'
})


// HistoryFrete.sync({ force: true })

module.exports = HistoryFrete