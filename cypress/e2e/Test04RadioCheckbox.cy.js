describe("Checking UI Elements", () => {
  it("Checking Radio Checkbox", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
    cy.get("a[href='/dropdown']").click();

    let expName = "Radio Buttons";
    cy.xpath("//h2[contains(text(),'Radio Buttons')]").then((name) => {
      let actualName = name.text();

      // BDD Style
      expect(actualName).to.equal(expName);
    });

    //Verify visibility of Radio Buttons
    cy.xpath("//label[input[@type='radio'] and text()='Option 1']/input").should("be.visible");

    //Selecting of Radio Button
    cy.xpath("//label[input[@type='radio'] and text()='Option 1']/input").check().should("be.checked");

    //Deseclecting of Radio Button
    cy.xpath("//label[input[@type='radio'] and text()='Option 2']/input").click();
  });

  it("checking checkboxs", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
    cy.get("a[href='/dropdown']").click();

    let expName = "Checkboxes";
    cy.xpath("//h2[contains(text(),'Checkboxes')]").then((name) => {
      let actualName = name.text();

      //TDD Style
      assert.equal(actualName, expName);
    });

    //visibility of checkbox element
    cy.xpath("//label[input[@type='checkbox'] and text()='Checkbox 1']/input").should("be.visible");

    //selecting of checkbox
    cy.xpath("//label[input[@type='checkbox'] and text()='Checkbox 1']/input").check().should("be.checked");

    //Deselecting of checkbox
    cy.xpath("//label[input[@type='checkbox'] and text()='Checkbox 1']/input").uncheck().should("not.be.checked");
  });

  it("select all checkboxes", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
    cy.get("a[href='/dropdown']").click();

    //visibility of checkbox element
    cy.xpath("//input[@type='checkbox']").should("be.visible");

    //selecting of checkbox
    cy.xpath("//input[@type='checkbox']").check().should("be.checked");

    //Deselecting of checkbox
    cy.xpath("//input[@type='checkbox']").uncheck().should("not.be.checked");

    //check only first checkbox
    cy.xpath("//input[@type='checkbox']").first().check().should("be.checked");

    //check only Last checkbox
    cy.xpath("//input[@type='checkbox']").last().check().should("be.checked");
  });
});
