describe("Xpath Locators", () => {
  it("find no of product", () => {
    cy.visit("https://selenium-test-react.vercel.app/");

    cy.title().should("eq", "Selenium Web");

    cy.url().should("include", "selenium-test-react").should("eq", "https://selenium-test-react.vercel.app/").should("contain", "selenium");

    cy.url()
      .should("include", "selenium-test-react")
      .and("eq", "https://selenium-test-react.vercel.app/")
      .and("contain", "selenium")
      .and("not.contain", "selemiuq");

    cy.title().should("include", "Selenium Web").and("eq", "Selenium Web").and("contain", "Selenium");

    cy.get(".headerStyle > h2").should("be.visible").and("exist");

    cy.xpath("//a").should("have.length", "23");

    cy.get("a[href='/loginportal']").click();

    cy.xpath("//h1[text()='Login']").should("be.visible").and("exist");

    cy.xpath("//input[@placeholder='Username']").type("pratham1659").should("have.value", "pratham1659");
    cy.xpath("//input[@placeholder='Password']").type("pratham143").should("have.value", "pratham143");
    cy.xpath("//input[@name='rememberMe']").click();

    cy.get("button[type='submit']").click();

    cy.xpath("//h1[contains(.,'Welcome, pratham1659!')]").should("contain", "pratham1659");
  });
});
