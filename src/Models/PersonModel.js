const Sequelize = require('sequelize')
const connecDB = require('../DataBase/ConnectDB')

const Person = connecDB.define('usuario', {
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// Person.sync({ force: true })

module.exports = Person