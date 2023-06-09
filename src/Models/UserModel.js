const Sequelize = require('sequelize')
const connecDB = require('../DataBase/ConnectDB')


const User = connecDB.define('user', {
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
}, {
    freezeTableName: true
})


// User.sync({ force: true })

module.exports = User