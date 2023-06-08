const request = require('supertest')
const app = require('../index')

describe('Test My App server', () => {
    it('should get main route', async () => {
        //Testando rota principal
        const resIndex = await request(app).get('/')
        console.log(resIndex.body)
        expect(resIndex.body).toHaveProperty('response' || '')
    })
})