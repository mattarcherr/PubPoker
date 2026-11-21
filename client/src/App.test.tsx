import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, test, vi } from 'vitest'
import App from './App'

vi.mock('./signalR', () => ({
    connection: { on: vi.fn(), off: vi.fn(), invoke: vi.fn() },
}))

beforeEach(() => vi.clearAllMocks())

test('Create Table opens the create menu, and Landing goes back', async () => {
    render(<App />)

    await userEvent.click(screen.getByRole('button', { name: 'Create Table' }))
    expect(screen.getByRole('heading', { name: 'Create Game Menu' })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Landing' }))
    expect(screen.getByRole('button', { name: 'Create Table' })).toBeInTheDocument()
})

test('Join Table opens the join menu, and Landing goes back', async () => {
    render(<App />)

    await userEvent.click(screen.getByRole('button', { name: 'Join Table' }))
    expect(screen.getByRole('heading', { name: 'Join Game Menu' })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Landing' }))
    expect(screen.getByRole('button', { name: 'Join Table' })).toBeInTheDocument()
})