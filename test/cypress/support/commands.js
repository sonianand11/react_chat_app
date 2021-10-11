// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add("login", (email, password) => { 
  cy.visit("/users/sign_in")
  cy.get("#user_email").type(email)
  cy.get("#user_password").type(password)
  cy.get("input[type='submit']").click()
})

Cypress.Commands.add("logout", (email, password) => { 
  cy.get("a[href='/users/sign_out']").click()
})
// commands.js
Cypress.Commands.add('preserveAllCookiesOnce', () => {
  cy.getCookies().then(cookies => {
    const namesOfCookies = cookies.map(c => c.name)
    Cypress.Cookies.preserveOnce(...namesOfCookies)
  })
})