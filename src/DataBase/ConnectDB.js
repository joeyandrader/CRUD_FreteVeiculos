const Sequelize = require('sequelize')

const connectDB = new Sequelize("postgres://jwqkspwx:hts0TDmE5s5nH8pTI5unjCCUEzP3nuCW@lallah.db.elephantsql.com/jwqkspwx")

module.exports = connectDB