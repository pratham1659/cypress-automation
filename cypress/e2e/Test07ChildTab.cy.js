describe("Opening a new", () => {
  it("Approach 1 - Handle tabs callsfake", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
    cy.get("a[href='/browsertabs']").click();

    // Stub window.open to open in the same tab
    cy.window().then((win) => {
      cy.stub(win, "open").callsFake((url) => {
        win.location.href = url;
      });
    });

    // Click the button that would normally open a new tab
    cy.get("div#btndiv > button").click();

    cy.url().should("include", "https://selenium-test-react.vercel.app/");

    // Verify the new URL dynamically
    cy.url().then((currentUrl) => {
      cy.log("Navigated to: " + currentUrl); // Debugging log
      expect(currentUrl).to.eq("https://selenium-test-react.vercel.app/");
    });

    cy.xpath("//h2[contains(text(),'Testing Arena')]").should("have.contain", "Testing Arena");

    cy.go("back"); //back to parent tab

    cy.url().should("include", "https://selenium-test-react.vercel.app/browsertabs");
  });

  it("Approach 2 - Handle tab remove attr", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
    cy.get("a[href='/browsertabs']").click();

    cy.get("button#newtab").click();

    cy.get("div#btndiv > button").invoke("removeAttr", "target").click();
  });
});
