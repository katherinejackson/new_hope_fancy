import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Dog from '../Dog';

const server = setupServer(
    rest.get('http://localhost:8080/dog_list', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([{
                id: 1,
                name: 'dog1',
                breed: '',
                age: 2,
                gender: "m",
                status: 0,
            }]),
        )
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders all dogs on load', async () => {
    render(<Dog />);

    await waitFor(() => expect(screen.getByText(/dog1/i)).toBeInTheDocument());
});