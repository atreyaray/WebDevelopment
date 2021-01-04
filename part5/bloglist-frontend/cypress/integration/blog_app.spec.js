describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.createUser({
            username: 'ray',
            password: 'atreyaray',
            name:'Atreya'
        })
    })
    it('Login form is shown', function () {
        cy.contains('login').click()
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login', function (){
        beforeEach(function (){
            cy.contains('login').click()
        })
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('ray')
            cy.get('#password').type('atreyaray')
            cy.get('#login-button').click()
            cy.contains('Atreya logged-in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('ray')
            cy.get('#password').type('atreya')
            cy.get('#login-button').click()
            cy.contains('wrong username or password')
            cy.get('.error').should('contain', 'wrong username or password')
            cy.get('.error').should('have.css','color', 'rgb(255, 0, 0)')

        })
    })

    describe('When logged in ', function () {
        beforeEach(function (){
            cy.login({ username: 'ray', password: 'atreyaray' })
        })
        it('A blog can be created', function () {
            cy.contains('create new blog').click()
            cy.get('#title').type('new blog title')
            cy.get('#author').type('atreya')
            cy.get('#url').type('www.google.com')
            cy.get('#create-button').click()
            cy.contains('new blog title')
        })

        describe('and a blog exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'A New Blog',
                    author: 'Atreya',
                    url: 'www.google.com'
                })
            })
            it('A user can like a blog', function () {
                cy.contains('show').click()
                cy.contains('like').click()
                cy.contains('1')
            })
        })
    })
})

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.createUser({
            username: 'ray',
            password: 'atreyaray',
            name: 'Atreya'
        })
    })
    describe('When logged in and there are 2 blogs ', function () {
        beforeEach(function () {
            cy.login({ username: 'ray', password: 'atreyaray' })
            cy.createBlog({
                title: 'Blog Title',
                author: 'Atreya',
                url: 'www.google.com'
            })
            cy.createBlog({
                title: 'Blog Title 2',
                author: 'Atreya',
                url: 'www.google.com'
            })
        })
        it('then blog can be deleted', function() {
            cy.contains('Blog Title 2')
                .contains('show')
                .click()
            cy.contains('Blog Title 2')
                .parent()
                .contains('remove')
                .click()
            cy.get('html').should('not.contain', 'Blog Title 2')
        })
        describe('and another user exists',function() {
            beforeEach(function (){
                const user = {
                    username: 'matti',
                    password: 'hultunen',
                    name: 'Matti'
                }
                cy.createUser({
                    username: user.username,
                    password: user.password,
                    name: user.name
                })
                cy.login({ username: user.username, password: user.password })
            })
            it('then he cannot delete the blog', function() {
                cy.contains('Blog Title 2')
                    .contains('show')
                    .click()
                cy.contains('Blog Title 2')
                    .parent()
                    .contains('remove')
                    .click()
                cy.get('html').should('contain', 'Blog Title')
            })
        })
        it('blogs are recorded according to number of likes', function(){
            cy.contains('Blog Title 2')
                .contains('show')
                .click()
            cy.contains('Blog Title 2')
                .parent()
                .contains('like')
                .click()
            cy.visit('http://localhost:3000/')
            cy.get('.blog')
                .then(blog => {
                    console.log('length', blog.length)
                    cy.wrap(blog[0]).contains('Blog Title 2')
                    cy.wrap(blog[1]).contains('Blog Title')
                })
        })
    })

})