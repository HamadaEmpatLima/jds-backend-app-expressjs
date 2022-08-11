const request = require('supertest');
const app = require('../app');

let access_token = '';
let access_token_admin = '';

let userData = {
    'name'     : 'Hamada User',
    'email'    : 'hamada.undetected@gmail.com',
    'password' : 'HamadaUser123',
    'nik'      : '1234567890123456',
    'role'     : 'user',
    'product'  : 'Salad'
}

let adminData = {
    'name'     : 'Hamada Admin',
    'email'    : 'hamada.admin@gmail.com',
    'password' : 'HamadaAdmin123',
    'nik'      : '1111111111111111',
    'role'     : 'admin',
    'product'  : 'Chip'
} 

describe("Products", () => {

    it("should login and get access_token", async () => {
        const user = await request(app)
            .post("/api/login")
            .send({
                email: userData.email,
                user: userData.nik,
                password: userData.password,
            });
        access_token = await user.body.data.access_token;

        const admin = await request(app)
            .post("/api/login")
            .send({
                email: adminData.email,
                user: adminData.nik,
                password: adminData.password,
            });
        access_token_admin = await admin.body.data.access_token;
    });

    it("should return product for user", async () => {
        const response = await request(app)
            .get('/api/product')
            .set('Authorization', 'Bearer ' + access_token);
                
        expect(response.status).toBe(200);
    });

    it("should return product for admin", async () => {
        const response = await request(app)
            .get('/api/admin/product?product=Chips&sort=price_asc')
            .set('Authorization', 'Bearer ' + access_token_admin);
                
        expect(response.status).toBe(200);
    });

    it("should return user product", async () => {
        const response = await request(app)
            .get('/api/product/my-product')
            .set('Authorization', 'Bearer ' + access_token);
                
        expect(response.status).toBe(200);
    });
});