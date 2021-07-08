// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************

const apiUrl = Cypress.env("apiUrl");
const { email, password } = Cypress.env("user");
const { _ } = Cypress;

interface UserInfo {
  username: string;
  password: string;
  email: string;
}
declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(): void;
    getToken(user: Partial<UserInfo>): Promise<string>;
  }
}
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
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
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (user = Cypress.env("user")) => {
  cy.getToken(user).then((token) => {
    localStorage.setItem('jwtToken', token);
  })
});

Cypress.Commands.add("getToken", (user = Cypress.env("user")) => {
  return cy.request("POST", `${apiUrl}/users/login`, {
    user: {
      email,
      password,
    },
  })
    .its('body.user.token')
    .should('exist');
});
