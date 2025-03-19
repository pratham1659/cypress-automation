describe("Action and Drag Operations", () => {
  beforeEach("login", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
  });

  it("Mouseover Operations", () => {
    cy.get("a[href='/mousemovement']").click();

    cy.xpath("//button[text()='Dropdown']").trigger("mouseover").click();

    cy.get("a[href='#Link1']").should("be.visible").click();
  });

  it("Right Click - Approach 1", () => {
    cy.get("a[href='/actions']").click();

    cy.xpath("//div[text()='Right-click here']").trigger("contextmenu");

    cy.xpath("//div[text()='Right-click detected!']").should("be.visible");
  });

  it("Right Click - Approach 2", () => {
    cy.get("a[href='/actions']").click();

    cy.xpath("//div[text()='Right-click here']").rightclick();
    cy.xpath("//div[text()='Right-click detected!']").should("be.visible");
  });

  it("Double Click - Approach 1", () => {
    cy.get("a[href='/actions']").click();

    cy.xpath("//div[text()='Double click here']").trigger("dblclick");
    cy.xpath("//div[text()='Well done!']").should("be.visible");
  });

  it("Double Click - Approach 2", () => {
    cy.get("a[href='/actions']").click();

    cy.xpath("//div[text()='Double click here']").dblclick();
    cy.xpath("//div[text()='Well done!']").should("be.visible");
  });

  it("Drag and Drop - Approach", () => {
    cy.get("a[href='/actions']").click();

    cy.get("div.gap-3 > div:first-child").drag("div.gap-6 > div.border-dashed:first-child");
    cy.get("div.gap-3 > div:first-child").drag("div.gap-6 > div.border-dashed:last-child");
    cy.get("div.gap-3 > div:first-child").drag("div.gap-6 > div.border-dashed:first-child");
    cy.get("div.gap-3 > div:first-child").drag("div.gap-6 > div.border-dashed:last-child");

    cy.get("div.min-w-\\[300px\\]").find("div.bg-green-100.rounded-full").contains("Apple").should("be.visible");

    cy.get("div.min-w-\\[300px\\]").find("div.bg-orange-100.rounded-full").contains("Broccoli").should("be.visible");
  });

  it("Mouse Hold Test - Approach", () => {
    cy.get("a[href='/actions']").click();

    // Hold mouse down for 5 seconds
    cy.xpath("//div[text()='Click and hold']")
      .trigger("mousedown", { button: 0 }) // Left mouse button
      .wait(5000) // Hold duration
      .trigger("mouseup", { button: 0 });

    // Verify the result
    cy.xpath('//div[text()="No, don\'t let go :("]').should("be.visible").click();
  });

  it("Mouse Hold Test - Realistic", () => {
    cy.get("a[href='/actions']").click();

    cy.xpath("//div[text()='Click and hold']")
      .realMouseDown({ button: "left" }) // Press mouse down
      .realMouseMove(0, 0, { duration: 5000 }) // Hold for 5 seconds
      .realMouseUp({ button: "left" }); // Release mouse

    // Verify the result
    cy.xpath('//div[text()="No, don\'t let go :("]').should("be.visible").click();
  });

  it("Mouse Hold + Shift Key Test - Approach", () => {
    cy.get("a[href='/actions']").click();

    // Get the target element and simulate shift + hold
    cy.contains("div", "Shift + Mouse Hold")
      .trigger("mousedown", { shiftKey: true }) // Press shift + mouse down
      .wait(3000) // Hold for 3 seconds
      .trigger("mouseup", { shiftKey: true }); // Release

    // Verify success message
    cy.contains("div", "Good job!").should("be.visible");
  });

  it.only("Mouse Hold + Shift Key Test - Approach", () => {
    cy.get("a[href='/dropdown']").click();

    cy.get(".border > ul > :nth-child(10)").scrollIntoView({ duration: 2000 });

    cy.get(".border > ul > :nth-child(10)").should("be.visible");

    cy.get(":nth-child(2) > .border > ul > :nth-child(6)").scrollIntoView({ duration: 2000 });

    cy.get(".border > ul > :nth-child(6)").should("be.visible");
  });
});
