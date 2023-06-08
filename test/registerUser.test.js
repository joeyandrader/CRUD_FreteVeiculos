const request = require('supertest')
const app = require('../index')

describe('Test My App user', () => {
    it('should get main route', async () => {
        //Testando registro de usuario
        const resRegisterUser = await request(app).post('/user/registerUser').send({
            firstname: "Teste",
            lastname: "Teste2",
            email: "teste@hotmail.com",
            password: "147258",
            confirmPassword: "147258"
        })
        console.log(resRegisterUser.body)
        expect(resRegisterUser.body).toHaveProperty('response')
    })
})