import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import {  fireEvent } from '@testing-library/dom'
import Blogform from './Blogform'

describe('Blogform', () => {
    let component
    const blog = {
        title: 'Sample blog',
        author: 'Anonymous author',
        url: 'www.google.com',
        likes: 12
    }
    const create = jest.fn()

    beforeEach(() => {
        component  = render(<Blogform create={create} />)
    })

    test('calls the event handler it received as props with the right details when a new blog is called', () => {
        const form = component.container.querySelector('form')
        expect(form).toBeDefined()

        const authorComp = component.container.querySelector('.author')
        expect(authorComp).toBeDefined()
        fireEvent.change(authorComp, {
            target: { value: blog.author }
        })

        const titleComp = component.container.querySelector('.title')
        expect(titleComp).toBeDefined()
        fireEvent.change(titleComp, {
            target: { value: blog.title }
        })

        const urlComp = component.container.querySelector('.url')
        expect(urlComp).toBeDefined()
        fireEvent.change(urlComp, {
            target: { value: blog.url }
        })

        fireEvent.submit(form)
        expect(create.mock.calls).toHaveLength(1)
        expect(create.mock.calls[0][0].title).toBe(blog.title)
        expect(create.mock.calls[0][0].author).toBe(blog.author)
        expect(create.mock.calls[0][0].url).toBe(blog.url)
    })
})