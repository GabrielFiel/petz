describe('Login', () => {
  beforeEach(() => {
    cy.fixture('sample_users').then((sampleUsers) => {
      cy.register(sampleUsers.naturalPerson, 'natural').as('user')
      cy.closeModal()
      cy.logout()
    })

    // Visits login page
    cy.visit('/login_LoginLoja.html')
  })

  context('by e-mail ', () => {
    it('should login sucessfully with valid credentials', function () {
      cy.login(this.user.email, this.user.password)

      cy.isUserLoggedIn(this.user)
    })

    it('should display error with invalid password', function () {
      cy.login(this.user.email, 'wrongPassword')

      cy.get('.dados-incorretos').should('have.text', 'Dados incorretos!')
      cy.isUserLoggedOut()
    })
  })

  context('by cpf ', () => {
    it('should login sucessfully with valid credentials', function () {
      cy.login(this.user.doc, this.user.password)

      cy.isUserLoggedIn(this.user)
    })

    it('should display error with invalid password', function () {
      cy.login(this.user.doc, 'wrongPassword')

      cy.get('.dados-incorretos').should('have.text', 'Dados incorretos!')
      cy.isUserLoggedOut()
    })
  })
})
