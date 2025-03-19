describe("IFrames Operations", () => {
  it("Approach -1 by using Commands", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");

    cy.get("a[href='/iframes']").click();

    // Wait for iframe and wrap it properly
    cy.get("#iframequill")
      .should("be.visible")
      .then(($iframe) => {
        const body = $iframe.contents().find("body"); // Access iframe's body
        cy.wrap(body).within(() => {
          cy.get(".ql-editor.ql-blank").type("Welcome {cmd+a}");

          cy.get("[aria-label='bold']").click();
          cy.get("[aria-label='underline']").click();

          cy.get(".ql-editor").type("Hello Cypress Automation {cmd+a}");
        });
      });
  });

  it("Approach -2 by using Custom Commands", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");

    cy.get("a[href='/iframes']").click();

    cy.getIframe("#iframequill").find(".ql-editor").should("be.visible").type("Welcome {cmd+a}");

    cy.getIframe("#iframequill").find("[aria-label='bold']").should("be.visible").click();

    cy.getIframe("#iframequill").find("[aria-label='underline']").should("be.visible").click();

    cy.getIframe("#iframequill").find(".ql-editor").type("Hello Cypress Automation {cmd+a}");
  });

  it("Approach -3 by using Cypress iframe plugin", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");

    cy.get("a[href='/iframes']").click();

    // Load the iframe
    cy.frameLoaded("#iframequill");

    // Type text inside the Quill editor
    cy.iframe("#iframequill").find(".ql-editor").should("be.visible").type("Welcome {cmd+a}");

    // Click on Bold and Underline buttons inside the iframe
    cy.iframe("#iframequill").find("[aria-label='bold']").should("be.visible").click();
    cy.iframe("#iframequill").find("[aria-label='underline']").should("be.visible").click();

    // Type additional text after formatting
    cy.iframe("#iframequill").find(".ql-editor").type("Hello Cypress Automation {cmd+a}");
  });
});
