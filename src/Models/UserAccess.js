const Sequelize = require('sequelize')
const connecDB = require('../DataBase/ConnectDB')

const UserAccess = connecDB.define('user_access', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// UserAccess.sync({ force: true })

module.exports = UserAccess