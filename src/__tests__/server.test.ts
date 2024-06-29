import request from "supertest";

import Server from '../server';
import jwt from "jsonwebtoken";
import getEnvironmentVariable from "../utils/environment";

jest.mock('../models/user')
jest.mock('../models/transaction')
jest.mock('sequelize')

const app = new Server()

describe('/v1/auth/signup', () => {
    test('should return 200 for correct parameters sent', async () => {

        const res = await request(app.app)
            .post('/v1/auth/signup')
            .send({
                username: 'ale31jo',
                password: 'test123',
            })
            .set('Accept', 'application/json')

        expect(res.statusCode).toBe(201)
    })

    test('should return 400 for incorrect parameters sent', async () => {
        const res = await request(app.app)
            .post('/v1/auth/signup')
            .send({
                username: 'ale31jo',
                password: 'tes', //password too short
            })
            .set('Accept', 'application/json')

        expect(res.statusCode).toBe(400)
    })
});

describe('/v1/transactions', () => {

    const token = jwt.sign({ userId: 1 }, getEnvironmentVariable('JWT_SECRET'), { expiresIn: '1h' });

    test('should return 201 for correct parameters sent', async () => {
        const res = await request(app.app)
            .post('/v1/transactions')
            .send({
                amount: 100,
                type: 'DEPOSIT',
            })
            .set('Accept', 'application/json').
            set('x-auth-token', token)

        expect(res.statusCode).toBe(201)
    })

    test('should return 400 for incorrect parameters sent', async () => {
        const res = await request(app.app)
            .post('/v1/transactions')
            .send({
                amount: 100,
                type: 'WITHDRAW', //incorrect type for positive amount
            })
            .set('Accept', 'application/json').
            set('x-auth-token', token)

        expect(res.statusCode).toBe(400)
    })

    test('should return 401 for incorrect token', async () => {
        const res = await request(app.app)
            .post('/v1/transactions')
            .send({
                amount: 100,
                type: 'deposit',
            })
            .set('Accept', 'application/json')
            .set('x-auth-token', 'incorrect_token')

        expect(res.statusCode).toBe(401)
    })
});
