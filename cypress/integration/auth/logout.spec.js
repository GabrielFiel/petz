describe('Logout', () => {
  beforeEach(() => {
    cy.fixture('sample_users').then((sampleUsers) => {
      cy.register(sampleUsers.naturalPerson, 'natural')
      cy.closeModal()
    })
  })

  it('should logout user', () => {
    cy.logout()
  })
})
