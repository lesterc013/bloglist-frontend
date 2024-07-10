import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect, test } from 'vitest'

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
