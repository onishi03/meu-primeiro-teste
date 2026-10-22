describe('Login', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com')
    })

    it('entra com usuario e senha', () => {
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.contains('Products').should('be.visible')
    })

    it('monstra erro para usuario bloqueado', () => {
        cy.get('[data-test="username"]').type('locked_out_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain', 'locked out')
    })

    it('monstra erro com senha errada', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('senha_errada')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('monstra erro com campos vazios', () => {
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username is required')
    })

    it('monstra erro com o usuario vazio', () => {
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username is required')
    })

    it('monstra erro com a senha vazia', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain', 'Epic sadface: Password is required')
    })
})