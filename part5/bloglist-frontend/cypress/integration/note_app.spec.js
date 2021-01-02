describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            username: 'ray',
            name: 'Atreya',
            password: 'atreyaray'

        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
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
            cy.get('#title').type('new blog')
            cy.get('#author').type('atreya')
            cy.get('#url').type('www.google.com')
            cy.get('#create-button').click()
        })
    })
})