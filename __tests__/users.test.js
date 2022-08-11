const request = require('supertest');
const app = require('../app');

let access_token = '';

let userTest = {
    "name": "Hamada Tester",
    "email": "hamada.tester@gmail.com",
    "password": "HamadaTester123",
    "nik": "0000000006666666",
    "role": "user"
}

describe("Users", () => {

    it("should create a new user", async () => {
        const res = await request(app)
            .post('/api/register')
            .send(userTest);
        expect(res.statusCode).toBe(201);
    });

    it("should login and get access_token", async () => {
        const response = await request(app)
            .post("/api/login")
            .send({
                email: userTest.email,
                user: userTest.nik,
                password: userTest.password,
            });
        expect(response.status).toBe(200);
        expect(response.body.data.access_token).toBeDefined();
        access_token = await response.body.data.access_token;
    });

    it("should return an generated password with param", async () => {
        const response = await request(app)
            .get('/api/user/generate-password?nik=1234567890123456&role=user');
                
        expect(response.status).toBe(200);
        expect(response.body.data.nik).toBe('1234567890123456');
        expect(response.body.data.role).toBe('user');
        expect(response.body.data.password).toBeDefined();
    });

    it("should return user login information", async () => {
        const response = await request(app)
            .get('/api/user/me')
            .set('Authorization', 'Bearer ' + access_token);
                
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe(userTest.name);
        expect(response.body.data.email).toBe(userTest.email);
        expect(response.body.data.nik).toBe(userTest.nik);
    });

    it("should delete user", async () => {
        const response = await request(app).delete("/api/user?email=" + userTest.email);
        expect(response.status).toBe(200);
    });
});