import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import Input from './Input'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'

/*
Explaining the test:
- BlogForm controls the states of title, author and blogUrl
- BlogForm takes in one parameter which is handleCreateBlog from App
  - This function is responsible for making POST requests with the returned newBlog obj
- We want to check if handleCreateBlog is called once per form submit, and whether it receives the correct details
*/
test('<BlogForm /> Test if handleCreateBlog is successfully called, and whether it received the right details', async () => {
  const mockCreateBlog = vi.fn()

  const { container } = render(<BlogForm handleCreateBlog={mockCreateBlog} />)

  const virtualUser = userEvent.setup()

  // Typing
  const titleInput = screen.getByTestId('titleInput')
  const authorInput = screen.getByTestId('authorInput')
  const blogUrlInput = screen.getByTestId('blogUrlInput')

  await virtualUser.type(titleInput, 'title test')
  await virtualUser.type(authorInput, 'author test')
  await virtualUser.type(blogUrlInput, 'blogUrl test')

  const createButton = screen.getByText('Create')
  await virtualUser.click(createButton)

  expect(mockCreateBlog.mock.calls[0][0].title).toBe('title test')
  expect(mockCreateBlog.mock.calls[0][0].author).toBe('author test')
  expect(mockCreateBlog.mock.calls[0][0].url).toBe('blogUrl test')
  expect(mockCreateBlog.mock.calls).toHaveLength(1)
})
