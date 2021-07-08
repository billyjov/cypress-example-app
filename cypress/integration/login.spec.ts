import * as AuthInputs from '../support/page-objects/auth.po';

const { email, password } = Cypress.env("user");


describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should send errors on wrong login ", () => {
    cy.get("[data-cy=sign-in]").click();

    cy.url().should("contain", "/login");

    AuthInputs.emailInput().type("wrong");
    cy.get("[data-cy=password]").type("wrong");
    cy.get("form").submit();

    cy.url().should("contain", "/login");

    cy.contains(".error-messages > li", "email or password is invalid");
    cy.get(".error-messages").should((elem) => {
      expect(elem.length).equal(1);
    });
  });

  it("should login correctly", () => {

    cy.intercept("POST", "/api/users/login").as('postLogin');

    cy.get("[data-cy=sign-in]").click();

    cy.url().should("contain", "/login");

    AuthInputs.emailInput().type(email);
    AuthInputs.passwordInput().type(password);
    cy.get("[data-cy=auth-submit]").click();

    cy.wait('@postLogin').then((res) => {
      cy.log('login works', JSON.stringify(res.response.statusCode));

      expect(res.response.statusCode).equals(200);

      cy.contains('a.nav-link', 'Your Feed').should('have.class', 'active');
      cy.contains('a.nav-link', 'Global Feed').should('not.have.class', 'active');
    })
  });
});
