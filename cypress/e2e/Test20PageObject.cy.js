import Login from "../pageObject/LoginPage";

describe("Page Object Model Operations", () => {
  beforeEach(() => {
    cy.fixture("example").then((data) => {
      cy.visit(data.seleniumurl);
    });

    cy.title().should("eq", "Selenium Web");
  });

  //General Approach
  it("Approach 1 - Login Operations", () => {
    let username = "admin",
      password = "admin";

    cy.get("a[href='/loginportal']").click();
    cy.get("input[name='username']").type(username);
    cy.get("input[name='password']").type(password);
    cy.get("input[name='rememberMe']").click();
    cy.get("button[type='submit']").click();
    cy.get(".text-2xl.font-bold").should("have.text", "Welcome");
  });

  //Page Object Model Approach
  it.only("Approach 2 - Login Operations", () => {
    cy.get("a[href='/loginportal']").click();

    cy.fixture("example").then((data) => {
      const ln = new Login();
      ln.setUserName(data.username);
      ln.setPassWord(data.password);
      ln.setRememberBtn();
      ln.clickSubmitBtn();
      ln.verifyLoginCheck(data.verifyLogin);
    });
  });
});
