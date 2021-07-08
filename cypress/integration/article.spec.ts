describe("Articles", () => {
  it("should login correctly", () => {
    cy.visit('/login');
    cy.location('pathname').should('contain', '/login');
    cy.login();
    cy.visit('/login');
    cy.location('pathname').should('not.contain', '/login');
  });
});
