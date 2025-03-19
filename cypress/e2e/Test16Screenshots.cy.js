describe("Navigation Operations", () => {
  before(() => {
    cy.log("Launch App Started");
  });
  beforeEach("login Page", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
  });

  it.skip("Validate Screenshots", () => {
    cy.get("a[href='/loginportal']").click();
    cy.loginapp("admin", "admin");
    cy.scrolltop(1000);
    cy.get(".text-red-500.text-sm.text-center.mt-2").should("have.text", "Invalid Credentials");
    cy.screenshot("invalid Credentials");
    cy.get(".max-w-md").screenshot("logo");
  });

  it.only("Validate negative Scenario Screenshots", () => {
    cy.get("a[href='/loginportal']").click();
    cy.loginapp("admin", "admin");
    cy.scrolltop(1000);
    cy.get(".text-red-500.text-sm.text-center.mt-2").should("have.text", "Invalid Credential");
  });
});
