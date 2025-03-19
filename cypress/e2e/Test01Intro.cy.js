describe("Visit Selenium Web", () => {
  it("verify positive_test", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
  });

  it("verify negative_test", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
  });
});

describe("Visit Selenium Web", () => {
  it("css locators", () => {
    cy.visit("https://selenium-test-react.vercel.app/predictivesearch");

    cy.get("input[type='text']").type("India"); //attribute use here

    cy.get("div[class='predictDialoge'] ul li").contains("India"); //Assertion

    cy.get("a[href='/contactus']").click(); //click operations

    cy.get("input[name='firstName']").type("Pratham");
    cy.get("input[name='lastName']").type("Kumar");
    cy.get("input[name='username']").type("pratham1659");
    cy.get("input[name='email']").type("prathamkumar1985@gmail.com");
    cy.get("input[name='dob']").type("2001-09-05");
    cy.get("input[name='contact']").type("9508688080");

    cy.get("button[type='submit']").click(); //click operations
  });
});

describe("Xpath Locators", () => {
  it("find no of product", () => {
    cy.visit("https://selenium-test-react.vercel.app/tables");

    cy.xpath("//td[@id='sname']").should("have.length", 10);

    cy.xpath("//table[@class='student-table']").xpath("//td[@id='sname']").should("have.length", 10);
  });
});
