module.exports = {
    /**
     * Função para retornar um formato JSON organizado
     * @param {*} param0 
     * @returns 
     * @by Joel Andrade
     */
    BuildReturn: ({ res: res, json: json, status: status, success: success, message: message }) => {
        var code = 0;
        json == null ? json = null : json
        /**
         * code = 0 -> Bad request, Erro na api  
         * code = 1 -> sucesso
         * code = 2 -> Dados invalidos ou não preenchidos
         */
        if (status == 200) {
            status = 200
            message != null ? message : message = "OK"
            success = true
            code = 1
        } else if (status == 201) {
            status = 201
            success = true
            message != null ? message : message = "Created"
            code = 1
        } else if (status == 422) {
            status = 422
            success = false
            message != null ? message : message = "Invalid data"
            code = 2
        } else if (status == 401) {
            status = 401
            success = false
            message != null ? message : message = "Unauthorized"
            code = 0
        } else if (status == 500) {
            status = 500
            success = false
            message != null ? message : message = "Error request the API"
            code = 0
        }
        return res.status(status).json({
            message: message,
            response: json,
            success: success,
            status: status,
            code: code
        })
    }
}