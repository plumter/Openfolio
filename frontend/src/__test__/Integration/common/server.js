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
