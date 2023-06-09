const Sequelize = require('sequelize')
const connecDB = require('../DataBase/ConnectDB')
const User = require('./UserModel')

const UserAccess = connecDB.define('user_access', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
})

UserAccess.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
})

// UserAccess.sync({ force: true })

module.exports = UserAccess