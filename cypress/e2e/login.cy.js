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
})