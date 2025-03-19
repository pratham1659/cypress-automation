describe("Custome Commands Operations", () => {
  before(() => {
    cy.log("Launch App Started");
  });
  beforeEach("login Page", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
    cy.get("a[href='/teststore']").click();
  });

  it("Handling Links", () => {
    cy.get("div[id*='products']:nth-child(2) > h3").should("have.text", "Smartphone");
  });

  //uisng custom commands
  it("Custom Links", () => {
    cy.clickLink("Smartphone");
  });

  it("Overwriting existing command", () => {
    cy.clickLink("Smartphone");
  });

  it.only("Login Custom Commands", () => {
    cy.get("a[href='/loginportal']").click();
    cy.loginapp("admin", "admin");
    cy.get(".text-3xl.font-bold.text-blue-700").scrollIntoView({ duration: 1000 });
    cy.get(".text-red-500.text-sm.text-center.mt-2").contains("Invalid Credentials");
  });
});
