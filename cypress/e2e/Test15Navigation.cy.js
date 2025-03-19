describe("Navigation Operations", () => {
  before(() => {
    cy.log("Launch App Started");
  });
  beforeEach("login Page", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
  });

  it("Validate TestStore", () => {
    cy.get("a[href='/teststore']").click();
    cy.go("back");
    cy.get(".flex > .text-3xl").scrollIntoView({ duration: 1000 }).should("have.text", "Welcome to HomePage");
    cy.go("forward");
    cy.get("a[href='/loginportal']").click();
    cy.loginapp("pratham1659", "pratham1659");
    cy.get(".text-3xl.font-bold.text-blue-700").scrollIntoView({ duration: 1000 });
    cy.reload();
    cy.go(-1); //back
    cy.go(1); //forward
  });

  after(() => {
    cy.log("Test Execution End");
  });
});
