const swaggerJSdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


const options = {
    swaggerDefinition: {
        info: {
            title: 'CRUD veiculo API',
            version: '1.0.0',
            description: 'Crud entrega de veiculos'
        },
    },
    apis: ["./src/Controllers/*.js"],
}

const swaggerSpec = swaggerJSdoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
}