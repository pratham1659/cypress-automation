describe("Action and Drag Operations", () => {
  before(() => {
    cy.log("Launch App Started");
  });
  // beforeEach("login Page", () => {
  //   cy.visit("https://selenium-test-react.vercel.app/");
  //   cy.title().should("eq", "Selenium Web");
  //   cy.get("a[href='/loginportal']").click();
  // });

  // //Fixtures Demo Test - Direct Access
  // it("Login Operations", () => {
  //   cy.fixture("example").then((data) => {
  //     cy.get("input[name='username']").type(data.username);
  //     cy.get("input[name='password']").type(data.password);
  //     cy.get("input[name='rememberMe']").click();
  //     cy.get("button[type='submit']").click();
  //     cy.get(".text-3xl.font-bold.text-blue-700").scrollIntoView({ duration: 1000 });
  //     cy.get(".text-blue-600").should("have.text", data.username);
  //   });
  // });

  //Access through Hooks for multiple it blocks
  // let userdata;
  // before(() => {
  //   cy.fixture("example").then((data) => {
  //     userdata = data;
  //   });
  // });
  // it("Login Operations with multiple it blocks", () => {
  //   cy.get("input[name='username']").type(userdata.username);
  //   cy.get("input[name='password']").type(userdata.password);
  //   cy.get("input[name='rememberMe']").click();
  //   cy.get("button[type='submit']").click();
  //   cy.get(".text-3xl.font-bold.text-blue-700").scrollIntoView({ duration: 1000 });
  //   cy.get(".text-blue-600").should("have.text", userdata.username);
  // });

  it.only("DataDriven Test", () => {
    cy.fixture("example").then((data) => {
      cy.visit("https://selenium-test-react.vercel.app/");
      cy.title().should("eq", "Selenium Web");
      cy.get("a[href='/loginportal']").click();

      data.forEach((userdata) => {
        cy.get("input[name='username']").type(userdata.username);
        cy.get("input[name='password']").type(userdata.password);
        cy.get("input[name='rememberMe']").click();
        cy.get("button[type='submit']").click();
        cy.get(".text-3xl.font-bold.text-blue-700").scrollIntoView({ duration: 1000 });

        if (userdata.username == "pratham1659" && userdata.password == "pratham1659") {
          cy.get(".text-blue-600").should("have.text", userdata.username);
          cy.get("button[aria-label='Sign out of current account']").click();
        } else {
          cy.get(".text-red-500.text-sm.text-center.mt-2").should("have.text", userdata.expected);
          cy.get(".text-3xl.font-bold.text-blue-700").scrollIntoView({ duration: 1000 });
        }
      });
    });
  });
});
