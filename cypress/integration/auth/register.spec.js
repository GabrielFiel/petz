describe('Register', () => {
  beforeEach(() => {
    cy.fixture('sample_users').as('users')
  })

  it('should register as natural person and auto login', function () {
    cy.register(this.users.naturalPerson, 'natural')

    cy.isVisitorRegistered()
    cy.isUserLoggedIn(this.users.naturalPerson)
  })

  it('should register as legal person and auto login', function () {
    cy.register(this.users.legalPerson, 'legal')

    cy.isVisitorRegistered()
    cy.isUserLoggedIn(this.users.legalPerson)
  })
})
