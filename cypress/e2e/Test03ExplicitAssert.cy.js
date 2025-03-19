const { assert } = require("chai");

describe("Xpath Locators", () => {
  it("Explicit Assertion", () => {
    cy.visit("https://selenium-test-react.vercel.app/");

    cy.title().should("eq", "Selenium Web");

    cy.get("a[href='/loginportal']").click();

    cy.xpath("//h1[text()='Login']").should("be.visible").and("exist");

    cy.xpath("//input[@placeholder='Username']").type("pratham1659").should("have.value", "pratham1659");
    cy.xpath("//input[@placeholder='Password']").type("pratham143").should("have.value", "pratham143");
    cy.xpath("//input[@name='rememberMe']").click();

    cy.get("button[type='submit']").click();

    let expName = "pratham1659";

    cy.xpath("//h2[contains(text(),'pratham1659')]").then((name) => {
      let actualName = name.text();

      // BDD Style
      expect(actualName).to.equal(expName);
      // expect(actualName).to.not.equal(expName);

      //TDD Style
      assert.equal(actualName, expName);
      // assert.notEqual(actualName, expName);
    });
  });
});
