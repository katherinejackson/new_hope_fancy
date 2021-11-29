import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Homevisit from '../Homevisit';

const server = setupServer(
    rest.get('http://localhost:8080/homevisit_list', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([{
                id: 1,
                staffid: 1,
                first_name: 'first',
                last_name: 'last',
                dogid: 1,
                dog: 'dog name',
                status: 0,
            }]),
        )
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders all homevisits on load', async () => {
    render(<Homevisit />);

    await waitFor(() => expect(screen.getByText(/first/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/last/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/dog name/i)).toBeInTheDocument());
});