describe("Handle Dropdown", () => {
  it("Dropdown with select", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
    cy.get("a[href='/dropdown']").click();

    cy.xpath("//select[@class='border p-2 w-full']").select("Option 2").should("have.value", "option 2");
  });

  it("Drodpown without select", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
    cy.get("a[href='/predictivesearch']").click();

    cy.get("input[placeholder='Search countries...']").type("India");
    // cy.get("input[placeholder='Search countries...']").type("United Kingdom").type("{enter}");
    cy.get("li[class='p-2 cursor-pointer hover:bg-gray-200 transition']").click();

    cy.get("input[placeholder='Search countries...']").should("have.value", "India");

    //  cy.get("input[placeholder='Search countries...']").should("have.text", "India");
  });

  it("Drodpown select and get values ", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
    cy.get("a[href='/predictivesearch']").click();

    cy.get("input[placeholder='Search countries...']").type("Unit");

    cy.xpath("//div[@role='listbox']//ul/li").contains("United Kingdom").click();

    cy.get("input[placeholder='Search countries...']").should("have.value", "United Kingdom");
  });

  it("Dynamic Dropdown", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
    cy.get("a[href='/predictivesearch']").click();

    // Type search query with a slight delay for stability
    cy.get("input[placeholder='Search countries...']").type("Unit", { delay: 100 });

    // Wait for suggestions to load
    cy.wait(1000);

    // Validate the number of search suggestions (adjust number as per your test case)
    cy.xpath("//div[@role='listbox']//ul/li").should("have.length.at.least", 1);

    // Loop through the dropdown options and click on the desired one
    cy.get("div[role='listbox'] ul li").each(($el) => {
      if ($el.text() == "United States") {
        cy.wrap($el).click();
      }
    });

    // Validate that the selected value is correctly placed in the search box
    cy.get("input[placeholder='Search countries...']").should("have.value", "United States");
  });
});
