import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('Blog renders the title and author, but does not render its url or number of likes by default', () => {
    const addLike = jest.fn()
    const removeBlog = jest.fn()
    const blog = {
        title : 'Sample blog',
        author: 'Anonymous author',
        url : 'www.google.com',
        likes : 12
    }

    const component = render(
        <Blog blog={blog} addLike={addLike} removeBlog={removeBlog} />
    )
    const additionalInfo = component.container.querySelector('.expandedView')
    console.log(prettyDOM(additionalInfo))
    expect(additionalInfo).toHaveStyle('display:none')
})