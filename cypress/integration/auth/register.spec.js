import { cpf, cnpj } from 'cpf-cnpj-validator'

describe('Register', () => {
  let users

  beforeEach(() => {
    // Visit register page
    cy.visit('/novo_ClienteLoja.html')

    cy.fixture('sample_users').then((sampleUsers) => {
      users = sampleUsers
    })
  })

  it('should register as natural person and auto login', () => {
    // Check natural person radio button
    cy.get('#tipoPessoaFisica').check()

    // Fill out natural person register form
    cy.get('#Nome').type(users.naturalPerson.name)
    cy.get('#Email').type(Cypress._.random(0, 1e6) + users.naturalPerson.email)
    cy.get('[name="cliente.dddCelular"]').type(users.naturalPerson.ddd)
    cy.get('[name="cliente.celular"]').type(users.naturalPerson.phone)
    cy.get('#CPF-CNPJ').type(cpf.generate())
    cy.get('#dataNascimento').type(users.naturalPerson.birthDate)
    cy.get('#Senha').type(users.naturalPerson.password)
    cy.get('#confirmasenha').type(users.naturalPerson.confirmPassword)

    cy.get('#criarContaButton').click()

    // Assert register was completed successfully
    cy.get('.modal-message').should('have.text', 'Dados salvos com sucesso')

    // Close confirmation modal
    cy.get('.ok').first().click()

    // Assert user is logged in
    cy.get('.username').should(
      'have.text',
      users.naturalPerson.name.split(' ')[0]
    )
  })

  it('should register as legal person', () => {
    // Check legal person radio button
    cy.get('#tipoPessoaJuridica').check()

    // Fill out natural person register form
    cy.get('#Nome').type(users.legalPerson.name)
    cy.get('#Email').type(Cypress._.random(0, 1e6) + users.legalPerson.email)
    cy.get('[name="cliente.dddCelular"]').type(users.legalPerson.ddd)
    cy.get('[name="cliente.celular"]').type(users.legalPerson.phone)
    cy.get('#CPF-CNPJ').type(cnpj.generate())
    cy.get('#isentoInscricaoEstadual').check()
    cy.get('#Senha').type(users.legalPerson.password)
    cy.get('#confirmasenha').type(users.legalPerson.confirmPassword)

    cy.get('#criarContaButton').click()

    // Assert register was completed successfully
    cy.get('.modal-message').should('have.text', 'Dados salvos com sucesso')

    // Close confirmation modal
    cy.get('.ok').first().click()

    // Assert user is logged in
    cy.get('.username').should(
      'have.text',
      users.legalPerson.name.split(' ')[0]
    )
  })
})
