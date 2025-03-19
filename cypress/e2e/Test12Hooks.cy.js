describe("Action and Drag Operations", () => {
  before(() => {
    cy.log("Launch App Started");
  });
  beforeEach("login", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
    cy.get("a[href='/loginportal']").click();
  });

  it("loginSearch", () => {
    cy.get("input[name='username']").type("admin");
    cy.get("input[name='password']").type("admin");

    cy.get("input[name='rememberMe']").click();
    cy.get("button[type='submit']").click();
    cy.get(".text-blue-600").should("have.text", "admin");
  });

  it("loginSearch", () => {
    cy.get("input[name='username']").type("pratham1659");
    cy.get("input[name='password']").type("admin");

    cy.get("input[name='rememberMe']").click();
    cy.get("button[type='submit']").click();
    cy.get(".text-blue-600").should("have.text", "pratham1659");
  });

  afterEach(() => {
    cy.get(".text-3xl.font-bold.text-blue-700").scrollIntoView({ duration: 1000 });
  });

  after(() => {
    cy.get("button[aria-label='Sign out of current account']").click();
    cy.get(".text-3xl.font-bold.text-blue-700").scrollIntoView({ duration: 1000 });
    cy.log("Text Execution Completed");
  });
});
