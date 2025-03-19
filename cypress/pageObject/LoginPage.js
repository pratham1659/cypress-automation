class Login {
  txtUserName = "input[name='username']";
  txtPassword = "input[name='password']";
  RememberBtn = "input[name='rememberMe']";
  SubmitBtn = "button[type='submit']";
  verifyLoginTxt = ".text-2xl.font-bold";

  setUserName(username) {
    cy.get(this.txtUserName).type(username);
  }
  setPassWord(password) {
    cy.get(this.txtPassword).type(password);
  }

  setRememberBtn() {
    cy.get(this.RememberBtn).click();
  }

  clickSubmitBtn() {
    cy.get(this.SubmitBtn).click();
  }

  verifyLoginCheck(verifyLogin) {
    cy.get(this.verifyLoginTxt).should("have.text", verifyLogin);
  }
}

export default Login;
