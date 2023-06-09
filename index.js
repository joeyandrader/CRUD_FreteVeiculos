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
const ProductRouter = require('./src/Routes/ProductRouter');
const VehicleRouter = require("./src/Routes/VehicleRouter");
const FreteRouter = require("./src/Routes/FreteRouter");

app.use("/", IndexRouter);
app.use("/user", UserRouter);
app.use('/product', ProductRouter);
app.use('/vehicle', VehicleRouter);
app.use('/frete', FreteRouter);


// export app
module.exports = app
