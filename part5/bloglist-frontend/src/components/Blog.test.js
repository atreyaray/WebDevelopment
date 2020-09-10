import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM, fireEvent } from '@testing-library/dom'
import Blog from './Blog'
describe('Blog ' , () => {
    let component
    beforeEach(() => {
        const addLike = jest.fn()
        const removeBlog = jest.fn()
        const blog = {
            title: 'Sample blog',
            author: 'Anonymous author',
            url: 'www.google.com',
            likes: 12
        }
        component = render(
            <Blog blog={blog} addLike={addLike} removeBlog={removeBlog} />
        )
    })

    test('renders the title and author, but does not render its url or number of likes by default', () => {
        const additionalInfo = component.container.querySelector('.expandedView')
        console.log(prettyDOM(additionalInfo))
        expect(additionalInfo).toHaveStyle('display:none')
    })

    test('url and number of likes are shown when the button controlling the shown details has been clicked', () => {
        const button = component.getByText('show')
        expect(button).toBeDefined()
        fireEvent.click(button)
        const additionalInfo = component.container.querySelector('.expandedView')
        expect(additionalInfo).not.toHaveStyle('display:none')
    })
})