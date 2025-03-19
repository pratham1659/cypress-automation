describe("Navigation Operations", () => {
  before(() => {
    cy.log("Launch App Started");
  });
  beforeEach("login Page", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
  });

  it.only("Login Custom Commands", () => {
    cy.get("a[href='/loginportal']").click();
    cy.loginapp("admin", "admin");
    cy.get(".text-3xl.font-bold.text-blue-700").scrollIntoView({ duration: 1000 });
    cy.get(".text-red-500.text-sm.text-center.mt-2").contains("Invalid Credentials");
  });
});
