import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'

test('<Blog /> only renders title and author on initial render', () => {
  const blog = {
    title: 'test',
    author: 'tester',
    url: 'test.com',
    likes: 0,
    user: {
      name: 'user123',
      username: 'user123',
    },
  }

  const user = {
    username: 'user123',
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const initialBlogRenderDiv = container.querySelector('.initialBlogRender')
  const element = screen.getByText('test, tester')

  const viewBlogRenderDiv = container.querySelector('.viewBlogRender')
  // The style of the initialBlogRender should not be display: none
  expect(initialBlogRenderDiv).not.toHaveStyle('display: none')

  // There should be an element with the text 'test, tester'
  expect(element).toBeDefined()

  // The style of the pressViewRender should be display: none
  expect(viewBlogRenderDiv).toHaveStyle('display: none')
})

test('Likes and URL displayed when view button is clicked', async () => {
  const blog = {
    title: 'test',
    author: 'tester',
    url: 'test.com',
    likes: 0,
    user: {
      name: 'user123',
      username: 'user123',
    },
  }

  const user = {
    username: 'user123',
  }

  const { container } = render(<Blog blog={blog} user={user} />)
  const virtualUser = userEvent.setup()

  const viewButton = screen.getByText('view')
  await virtualUser.click(viewButton)

  // Isolate the div that should be displayed when view is clicked
  const viewBlogRenderDiv = container.querySelector('.viewBlogRender')
  // Two separate expects for clarity
  expect(viewBlogRenderDiv).toHaveTextContent('test.com')
  expect(viewBlogRenderDiv).toHaveTextContent('0')
})
