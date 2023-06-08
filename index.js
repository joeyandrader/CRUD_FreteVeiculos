require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerDocJson = require('./swagger.json');
/**
 * Configuração inicial do express
 */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));

//cors
app.use(cors())

/**
 * Swagger config
 */
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocJson))

/**
 * Configuração das rotas
 */
const IndexRouter = require('./src/Routes/Routes');
const UserRouter = require('./src/Routes/UserRouter');

app.use("/", IndexRouter);
app.use("/user", UserRouter);


// export app
module.exports = app
