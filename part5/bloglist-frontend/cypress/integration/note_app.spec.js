describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
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
            const user = {
                username: 'ray',
                name: 'Atreya',
                password: 'atreyaray'

            }
            cy.request('POST', 'http://localhost:3003/api/users', user)
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
})