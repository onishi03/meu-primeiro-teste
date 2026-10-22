describe('Compra', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
    })

    it('adiciona a mochila no carrinho', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').should('have.text', '1')
    })

    it('finalizar a compra', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Teste')
        cy.get('[data-test="lastName"]').type('QA')
        cy.get('[data-test="postalCode"]').type('12345')
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="finish"]').click()
        cy.contains('Thank you for your order!').should('be.visible')
    })

    it('adiciona dois produtos no carrinho', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="shopping-cart-link"]').should('have.text', '2')
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Teste')
        cy.get('[data-test="lastName"]').type('QA')
        cy.get('[data-test="postalCode"]').type('12345')
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="finish"]').click()
        cy.contains('Thank you for your order!').should('be.visible')
    })

    it('remove a mochila do carrinho', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
    })

    it('ordena do menor para o maior preço', () => {
        cy.get('[data-test="product-sort-container"]').select('lohi')
        cy.get('[data-test="inventory-item-price"]').first().should('have.text', '$7.99')
    })

    it('fazer logout', () => {
        cy.get('#react-burger-menu-btn').click()
        cy.get('#logout_sidebar_link').click()
        cy.get('[data-test="login-button"]').should('be.visible')
        cy.contains('Accepted usernames are:').should('be.visible')
    })
})