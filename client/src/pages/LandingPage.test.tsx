import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import LandingPage from './LandingPage'

test('Create Table button calls onCreate', async () => {
    const onCreate = vi.fn()
    render(<LandingPage onCreate={onCreate} onJoin={vi.fn()} />)

    await userEvent.click(screen.getByRole('button', { name: 'Create Table' }))

    expect(onCreate).toHaveBeenCalledOnce()
})

test('Join Table button calls onJoin', async () => {
    const onJoin = vi.fn()
    render(<LandingPage onCreate={vi.fn()} onJoin={onJoin} />)

    await userEvent.click(screen.getByRole('button', { name: 'Join Table' }))

    expect(onJoin).toHaveBeenCalledOnce()
})