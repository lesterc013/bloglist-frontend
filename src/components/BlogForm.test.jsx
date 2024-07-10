import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import Input from './Input'
import userEvent from '@testing-library/user-event'
import { test, vi } from 'vitest'

test('<BlogForm /> Test if handleCreateBlog is successfully called, and whether it received the right details', async () => {
  const mockHandleCreateBlog = vi.fn()

  const { container } = render(
    <BlogForm handleCreateBlog={mockHandleCreateBlog} />
  )

  const virtualUser = userEvent.setup()

  const createButton = screen.getByText('Create')
  await virtualUser.click(createButton)

  console.log(mockHandleCreateBlog.mock.calls)
})
