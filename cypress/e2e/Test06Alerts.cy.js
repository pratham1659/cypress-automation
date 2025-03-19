describe("Alerts", () => {
  // 1) Javascript Alert: It will have some text and an 'OK' button

  it("JS Alert", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
    cy.get("a[href='/popupalerts']").click();

    cy.xpath("//button[contains(text(),'Show Alert')]").click();
    cy.on("window:alert", (t) => {
      expect(t).to.contains("This is a simple alert!");
    });

    cy.xpath("//button[contains(text(),'Show Alert')]").should("be.visible");
  });

  // 2) Javascript Confirm Alert: It will have some text with 'OK' and 'Cancel' buttons
  it("JS Confirm Alert - OK", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
    cy.get("a[href='/popupalerts']").click();
    cy.xpath("//button[contains(text(),'Show Confirm Alert')]").click();

    cy.on("window:confirm", (t) => {
      expect(t).to.contains("Are you sure you want to proceed?");
    });

    cy.xpath("//button[contains(text(),'Show Confirm Alert')]").should("be.visible");
  });

  it("JS Confirm Alert - Cancel", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
    cy.get("a[href='/popupalerts']").click();
    cy.xpath("//button[contains(text(),'Show Confirm Alert')]").click();

    cy.on("window:confirm", () => false); //cypress close alert window using cancel button

    cy.xpath("//button[contains(text(),'Show Confirm Alert')]").should("be.visible");
  });

  // 3) Javascript Prompt Alert: It will have some text with a text box for user input along with 'OK'
  it("JS Prompt Prompt -- OK", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
    cy.get("a[href='/popupalerts']").click();

    cy.window().then((win) => {
      cy.stub(win, "prompt").returns("pratham");
    });

    cy.xpath("//button[contains(text(),'Show Prompt Alert')]").click();

    //cypress will automatically close prompted alert- it will use OK button - by default

    cy.xpath("//button[contains(text(),'Show Prompt Alert')]").should("be.visible");
  });

  it("JS Prompt Alert -- Cancel", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
    cy.get("a[href='/popupalerts']").click();

    cy.xpath("//button[contains(text(),'Show Prompt Alert')]").click();

    cy.on("window:prompt", () => false);
    //cypress will automatically close prompted alert- it will use Cancel button - by default

    cy.xpath("//button[contains(text(),'Show Prompt Alert')]").should("be.visible");
  });

  // 4) Authenticated Alert - Method 1
  it("JS Authentication Alert -- Authentications", () => {
    cy.visit("https://the-internet.herokuapp.com/basic_auth", {
      auth: {
        username: "admin",
        password: "admin",
      },
    });
    cy.title().should("eq", "The Internet");

    cy.get("div[class='example'] p").should("have.contain", "Congratulations");
  });

  // 4) Authenticated Alert - Method 2
  it("JS Authentication Alert -- Authentications", () => {
    cy.visit("https://admin:admin@the-internet.herokuapp.com/basic_auth");
    cy.title().should("eq", "The Internet");
    cy.get("div[class='example'] p").should("have.contain", "Congratulations");
  });
});
