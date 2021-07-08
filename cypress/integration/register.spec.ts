describe("Register Success", () => {
  before(() => {
    cy.visit("http://localhost:4200");
  });
  it("should register a new user", () => {
    const username = 'helloLearning1';
    const email = 'hello@hellolearning1.com';
    const password = 'Test1234';

    cy.contains('a.nav-link', 'Sign up').click();

    cy.location('pathname').should('equal', '/register');

    expect(location.pathname).equal('/register');


    cy.get('[data-cy=username]').type(username);
    cy.get('[data-cy=email]').type(email);
    cy.get('[data-cy=password]').type(password);

    cy.get('form').submit();
    cy.location('pathname').should('equal', '/');
  });
});
