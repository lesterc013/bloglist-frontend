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

  // The style of the initialBlogRender should not be display: none
  const initialBlogRenderDiv = container.querySelector('.initialBlogRender')
  expect(initialBlogRenderDiv).not.toHaveStyle('display: none')

  // The style of the pressViewRender should be display: none
  const viewBlogRenderDiv = container.querySelector('.viewBlogRender')
  expect(viewBlogRenderDiv).toHaveStyle('display: none')
})
