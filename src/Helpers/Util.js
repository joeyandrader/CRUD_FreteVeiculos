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
         * code = 1 -> sucesso
         * code = 2 -> Dados invalidos ou não preenchidos
         * code = 0 -> Bad request, Erro na api  
         */
        if (status == 200) {
            status = 200
            message != null ? message : message = "OK"
            code = 1
        } else if (status == 201) {
            status = 201
            message != null ? message : message = "Created"
            code = 1
        } else if (status == 422) {
            status = 422
            message != null ? message : message = "Invalid data"
            code = 2
        } else if (status == 500) {
            status = 500
            message != null ? message : message = "Error request the API"
            code = 0
        }

        if (status == 200) {
            success = true
            return res.status(status).json({
                message: message,
                response: json,
                success: success,
                status: status,
                code: code
            })
        }
        return res.status(status).json({
            message: message,
            response: json,
            success: false,
            status: status,
            code: code
        })
    }
}