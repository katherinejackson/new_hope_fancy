import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Staff from '../Staff';
import userEvent from '@testing-library/user-event'

const server = setupServer(
    rest.get('http://localhost:8080/staff_list', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([{
                id: 1,
                first_name: 'first',
                last_name: 'last',
                phone: '1234'
            }]),
        )
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders all staff on load', async () => {
    render(<Staff />);

    await waitFor(() => expect(screen.getByText(/first/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/last/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/1234/i)).toBeInTheDocument());
});

test('renders add new staff button', async () => {
    render(<Staff />);

    expect(screen.getByText(/Add New Staff/i)).toBeInTheDocument();
});

// test('displays update component on staff click', async () => {
//     render(<Staff />);

//     await waitFor(() => screen.getByText(/first/i).toBeInTheDocument)
//         .then(
//             userEvent.click(screen.getByText(/first/i))
//         );

//     await waitFor(() => expect(screen.getByText(/Update Staff/i)).toBeInTheDocument());
// })