describe("Custome Commands Operations", () => {
  before(() => {
    cy.log("Launch App Started");
  });
  beforeEach("login Page", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
    cy.get("a[href='/teststore']").click();
  });

  it.only("Handling Links", () => {
    cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > h3:nth-child(1)"
    ).should("have.text", "Smartphone");
  });
});
