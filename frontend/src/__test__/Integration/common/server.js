import { rest } from 'msw'
import { setupServer } from 'msw/node';

import '@testing-library/jest-dom';

// Mock Server
export const server = setupServer(

    // Capture svg get request
    rest.get("/assets/media/svg/*", (_, res, ctx) => res(ctx.text(""))),
    
    // Sign-in link Request 
    rest.post('/v1/user/signin', async (req, res, ctx) => {
        const {email} = await req.json();
        // Fail
        if (email !== "hammed@plumter.com"){
            return res(ctx.status(400), ctx.json({"success":false, "message":"Invalid Request"}))
        }
        // Success
        return res(ctx.json({"success":true,"message":"An email has been sent to hammed@plumter.com, please click the link to continue"}))
    }),

    // Profile View
    rest.get('/v1/user/public/profile/:id', async (req, res, ctx) => {
        const { id } = req.params
        // Fail
        if (id !== "63eb743cbf03b80915f4ad88"){
            return res(ctx.status(400), ctx.json({"error":"User does not exist"}))
        }
        // Success
        return res(ctx.json({"data":{"email":"hammed@plumter.com","name":"Successtar","companyName":"Plumter","companyAddress":"Lekki","position":"CEO","website":"https://plumter.com/successtar","phone":"+2347061855688"},"message":"Ok"}))
    }),

    // Edit Profile View
    rest.get('/v1/user/profile', async (req, res, ctx) => {
        const authorization = req.headers.get("authorization");
        // Fail
        if (authorization !== "Bearer v2.local.u_MS6bh89_WKlvnxFi9dxK4HwGYVu4HjJ1HGJJWTrAjP_gLkSXy-8uxXN7pWEuA057-JGwHVETDNFN68hIObh9nEj3LGaNXA4w-iOCMaQsN9jofEaLJ9WovWHviGENYsy1ESnnrUILdmVkkgrkmxcDjKHgYj1RCcZfIGanFia9ImqekQd5Cu1640get1JguYsVN638LArS7yhUWwHKliZ4qYl383TNVLG_OdtCvkVYMXr4oLDQd6jqLHuHKYngPFqJt8_yR7Q704GzkU.bnVsbA"){
            return res(ctx.status(400), ctx.json({"error":"Invalid token"}))
        }
        // Success
        return res(ctx.json({"data":{"_id":"63eb743cbf03b80915f4ad88","email":"hammed@plumter.com","name":"","companyName":"","companyAddress":"","position":"","website":"","phone":"","token":"v2.local.u_MS6bh89_WKlvnxFi9dxK4HwGYVu4HjJ1HGJJWTrAjP_gLkSXy-8uxXN7pWEuA057-JGwHVETDNFN68hIObh9nEj3LGaNXA4w-iOCMaQsN9jofEaLJ9WovWHviGENYsy1ESnnrUILdmVkkgrkmxcDjKHgYj1RCcZfIGanFia9ImqekQd5Cu1640get1JguYsVN638LArS7yhUWwHKliZ4qYl383TNVLG_OdtCvkVYMXr4oLDQd6jqLHuHKYngPFqJt8_yR7Q704GzkU.bnVsbA","createdAt":"2023-02-16T15:25:38.23+01:00","updatedAt":"2023-02-16T15:25:38.23+01:00"},"message":"Ok"}))
    }),

    // Update Profile View
    rest.patch('/v1/user/profile', async (req, res, ctx) => {
        const authorization = req.headers.get("authorization");
        const body = await req.json();
        // Fail
        if (authorization !== "Bearer v2.local.u_MS6bh89_WKlvnxFi9dxK4HwGYVu4HjJ1HGJJWTrAjP_gLkSXy-8uxXN7pWEuA057-JGwHVETDNFN68hIObh9nEj3LGaNXA4w-iOCMaQsN9jofEaLJ9WovWHviGENYsy1ESnnrUILdmVkkgrkmxcDjKHgYj1RCcZfIGanFia9ImqekQd5Cu1640get1JguYsVN638LArS7yhUWwHKliZ4qYl383TNVLG_OdtCvkVYMXr4oLDQd6jqLHuHKYngPFqJt8_yR7Q704GzkU.bnVsbA"){
            return res(ctx.status(400), ctx.json({"error":"Invalid token"}));
        }
        if (JSON.stringify(body) !== '{"email":"hammed@plumter.com","name":"Successtar","companyName":"Plumter","companyAddress":"Lekki","position":"CEO","website":"https://plumter.com","phone":"+2348061855688"}'){
            return res(ctx.status(400), ctx.json({"error":"Invalid Request"}));
        }

        // Update Response
        server.use(rest.get('/v1/user/profile', async (req, res, ctx) => {
            const authorization = req.headers.get("authorization");
            // Fail
            if (authorization !== "Bearer v2.local.u_MS6bh89_WKlvnxFi9dxK4HwGYVu4HjJ1HGJJWTrAjP_gLkSXy-8uxXN7pWEuA057-JGwHVETDNFN68hIObh9nEj3LGaNXA4w-iOCMaQsN9jofEaLJ9WovWHviGENYsy1ESnnrUILdmVkkgrkmxcDjKHgYj1RCcZfIGanFia9ImqekQd5Cu1640get1JguYsVN638LArS7yhUWwHKliZ4qYl383TNVLG_OdtCvkVYMXr4oLDQd6jqLHuHKYngPFqJt8_yR7Q704GzkU.bnVsbA"){
                return res(ctx.status(400), ctx.json({"error":"Invalid token"}))
            }
            // Success
            return res(ctx.json({"data":{"_id":"63eb743cbf03b80915f4ad88","email":"hammed@plumter.com","name":"Successtar","companyName":"Plumter","companyAddress":"Lekkis","position":"CEO","website":"https://plumter.com/successtar","phone":"+2347061855688","token":"v2.local.u_MS6bh89_WKlvnxFi9dxK4HwGYVu4HjJ1HGJJWTrAjP_gLkSXy-8uxXN7pWEuA057-JGwHVETDNFN68hIObh9nEj3LGaNXA4w-iOCMaQsN9jofEaLJ9WovWHviGENYsy1ESnnrUILdmVkkgrkmxcDjKHgYj1RCcZfIGanFia9ImqekQd5Cu1640get1JguYsVN638LArS7yhUWwHKliZ4qYl383TNVLG_OdtCvkVYMXr4oLDQd6jqLHuHKYngPFqJt8_yR7Q704GzkU.bnVsbA","createdAt":"2023-02-14T12:45:00.421+01:00","updatedAt":"2023-02-16T17:42:50.276+01:00"},"message":"Ok"}))
        }))

        // Success
        return res(ctx.json({"data":{"_id":"63eb743cbf03b80915f4ad88","email":"hammed@plumter.com","name":"","companyName":"","companyAddress":"","position":"","website":"","phone":"","token":"v2.local.u_MS6bh89_WKlvnxFi9dxK4HwGYVu4HjJ1HGJJWTrAjP_gLkSXy-8uxXN7pWEuA057-JGwHVETDNFN68hIObh9nEj3LGaNXA4w-iOCMaQsN9jofEaLJ9WovWHviGENYsy1ESnnrUILdmVkkgrkmxcDjKHgYj1RCcZfIGanFia9ImqekQd5Cu1640get1JguYsVN638LArS7yhUWwHKliZ4qYl383TNVLG_OdtCvkVYMXr4oLDQd6jqLHuHKYngPFqJt8_yR7Q704GzkU.bnVsbA","createdAt":"2023-02-16T15:25:38.23+01:00","updatedAt":"2023-02-16T15:25:38.23+01:00"},"message":"Ok"}))
    }),


)

window.scrollTo = jest.fn();
window.setImmediate = jest.fn();
window.clearImmediate = jest.fn();


jest.setTimeout(60000);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());
