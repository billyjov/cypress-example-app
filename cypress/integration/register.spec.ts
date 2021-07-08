describe("Register Success", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should register a new user", () => {
    const { username, email, password } = Cypress.env("user");

    cy.contains("a.nav-link", "Sign up").click();

    cy.location("pathname").should("equal", "/register");

    cy.get("[data-cy=username]").type(username);
    cy.get("[data-cy=email]").type(email);
    cy.get("[data-cy=password]").type(password);

    cy.get("form").submit();
    cy.location("pathname").should("equal", "/");
  });
});
