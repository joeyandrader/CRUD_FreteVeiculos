const Sequelize = require('sequelize')

const connectDB = new Sequelize("crudveiculo", 'postgres', '1596325852', {
    host: 'localhost',
    dialect: 'postgres',
    timezone: '-3:00'
})

module.exports = connectDB