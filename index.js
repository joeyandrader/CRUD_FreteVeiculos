require('dotenv').config()
const express = require('express');
const port = process.env.PORT || 5000;
const host = process.env.HOST || "0.0.0.0"
const app = express();


/**
 * Configuração inicial do express
 */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));


/**
 * Swagger config
 */
const swaggerSetup = require('./src/Configs/swagger');
swaggerSetup(app)

/**
 * Configuração das rotas
 */
const IndexRouter = require('./src/Routes/Routes');
const UserRouter = require('./src/Routes/UserRouter');

app.use("/", IndexRouter);
app.use("/user", UserRouter);



/**
 * Server
 */
app.listen(port, host, () => {
    console.log(`Server is running at port ${port}`)
})