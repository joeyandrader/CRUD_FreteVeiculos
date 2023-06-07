const swagger = require("../Configs/swagger")
const { BuildReturn } = require("../Helpers/Util")


module.exports = class IndexController {


    /**
     * @swagger
     * /: {
     *      get: {
     *          description: Index da aplicação,
     *          responses: {
     *              '200': {
     *                  description: OK
     *              },
     *              '422': {
     *                  description: Dados invalidos
     *              },
     *              '500':{
     *                  description: Bad Request
     *              }
     *          }
     *      } 
     * }
     */
    static async Index(req, res) {
        try {
            BuildReturn({ res: res, status: 200, json: "Hello World Docker" })
        } catch (error) {
            BuildReturn({ res: res, status: 500, json: error })
        }
    }

}