describe('Checkout', () => {
  beforeEach(() => {
    cy.fixture('sample_users').then((sampleUsers) => {
      cy.register(sampleUsers.naturalPerson, 'natural')
      cy.closeModal()
    })
  })

  context('Payment method: boleto', () => {
    it('should checkout product', () => {
      // Searches for a product and add it to the cart
      cy.get('#search').type('petisco')
      cy.get('.button-search').click()
      cy.get('.liProduct').first().click()
      cy.get('#adicionarAoCarrinho').click()
      cy.get('.subtotal .btn-redondo-verde').click()

      // Sets shipping address
      cy.fixture('shipping_address').then((address) => {
        cy.get('#cep-input').type(address.cep).blur()
        cy.get('#numero').should('be.visible').type(address.number)
        cy.get('#apelido').type(address.name)
      })

      // Sets shipping method
      cy.get('#continuarEndereco').click()
      cy.get('.endereco-min').click()
      cy.get('#botaoEntregaEconomica').should('contain.text', 'Econômica')
      cy.get('#botaoEntregaEconomica').click()

      // Sets payment method
      cy.get('.boleto').click({ timeout: 15000 })

      // Finish checkout
      cy.get('.concluir-compra').click()

      // Assertions
      cy.get('.confirm-data-number', { timeout: 15000 }).should('exist')
      cy.get('.imprimir-btn').should('exist')

      cy.contains('obrigado por comprar na Petz')
    })
  })
})
