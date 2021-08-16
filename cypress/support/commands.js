import { cpf, cnpj } from 'cpf-cnpj-validator'

// Ignores blocked hosts on log
Cypress.Server.defaults({
  ignore: (xhr) => {
    return Cypress.config().blockHosts.some(
      (
        blockedHost // get blockHosts from cypress.json using Cypress.config()
      ) => Cypress.minimatch(new URL(xhr.url).host, blockedHost) // if current url matches any blockedHost item, return true
    )
  },
})

before(() => {
  // Bypass error threw by application
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })
})

// Registers visitor
Cypress.Commands.add('register', (userData, userType = natural) => {
  let doc
  const email = Cypress._.random(0, 1e6) + userData.email

  // Visit register page
  cy.visit('/novo_ClienteLoja.html')

  // Specific for natural person
  if (userType == 'natural') {
    doc = cpf.generate()

    cy.get('#tipoPessoaFisica').check()
    cy.get('#CPF-CNPJ').type(doc)
    cy.get('#dataNascimento').type(userData.birthDate)
  }

  // Specific for legal person
  if (userType == 'legal') {
    doc = cnpj.generate()

    cy.get('#tipoPessoaJuridica').check()
    cy.get('#CPF-CNPJ').type(doc)

    // Check Isento checkbox
    cy.get('#isentoInscricaoEstadual').check()
  }

  // Fill out register form shared fields
  cy.get('#Nome').type(userData.name)
  cy.get('#Email').type(email)
  cy.get('[name="cliente.dddCelular"]').type(userData.ddd)
  cy.get('[name="cliente.celular"]').type(userData.phone)
  cy.get('#Senha').type(userData.password)
  cy.get('#confirmasenha').type(userData.password)

  cy.get('#criarContaButton').click()

  return cy.wrap({
    name: userData.name,
    doc: doc,
    email: email,
    password: userData.password,
  })
})

// Checks if visitor got registered succesfully
Cypress.Commands.add('isVisitorRegistered', () => {
  // Assert register was completed successfully
  cy.get('.modal-message').should('have.text', 'Dados salvos com sucesso')
})

// Logs user in (UI)
Cypress.Commands.add('login', (username, password) => {
  cy.get('#loginCliente #email').type(username)
  cy.get('#Senha').type(password)

  cy.get('#loginCliente > .btn').click()
})

// Checks if user is logged in
Cypress.Commands.add('isUserLoggedIn', (userData) => {
  // Asserts user is logged in
  cy.get('.username').should('have.text', userData.name.split(' ')[0])

  // Checks if cookie is present
  cy.getCookie('petzLogin').should('exist')
})

// Logs user out (UI)
Cypress.Commands.add('logout', () => {
  // Simulates mouse hover
  cy.get('.login .dropdown-content')
    .invoke('fadeTo', 'fast', 1)
    .invoke('attr', 'style', 'pointer-events:all')
  cy.get('.logout-link a').click()

  cy.isUserLoggedOut()
})

// Checks if user is logged out
Cypress.Commands.add('isUserLoggedOut', () => {
  cy.get('.greetings').should('contain.text', 'Olá, Entre')

  // Check if cookie is not present
  cy.getCookie('petzLogin').should('not.exist')
})

// Closes modal
Cypress.Commands.add('closeModal', () => {
  cy.get('.ok').first().click()
})
