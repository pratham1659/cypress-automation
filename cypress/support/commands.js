// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

Cypress.Commands.add("getIframe", (iframeSelector) => {
  return cy
    .get(iframeSelector)
    .its("0.contentDocument.body")
    .should("not.be.empty") // Ensure iframe is loaded
    .then(cy.wrap);
});

Cypress.Commands.add("readTableData", (tableSelector, headers) => {
  let tableData = [];

  cy.get(`${tableSelector} tr`)
    .then(($rows) => {
      $rows.slice(1).each((_, row) => {
        let rowData = {};

        cy.wrap(row)
          .find("td")
          .each(($cell, cellIndex) => {
            // Exclude first column by starting from index 1
            if (cellIndex > 0) {
              rowData[headers[cellIndex - 1]] = $cell.text().trim();
            }
          })
          .then(() => {
            tableData.push(rowData);
          });
      });
    })
    .then(() => {
      return cy.wrap(tableData); // Return table data
    });
});

let rowCounter = 1; // Persistent row counter

Cypress.Commands.add("readTableDataWithId", (tableSelector, headers) => {
  let tableData = [];

  cy.get(`${tableSelector} tr`)
    .then(($rows) => {
      $rows.slice(1).each((_, row) => {
        let rowData = { id: rowCounter++ }; // Use global rowCounter

        cy.wrap(row)
          .find("td")
          .each(($cell, cellIndex) => {
            if (cellIndex > 0) {
              rowData[headers[cellIndex - 1]] = $cell.text().trim();
            }
          })
          .then(() => {
            tableData.push(rowData);
          });
      });
    })
    .then(() => {
      return cy.wrap(tableData); // Return table data with persistent IDs
    });
});

Cypress.Commands.add("readTableAndSaveData", (tableSelector, headers, filePath) => {
  cy.readTableData(tableSelector, headers).then((data) => {
    cy.writeFile(filePath, data);
  });
});

Cypress.Commands.add("readTableAndSaveDataWithId", (tableSelector, headers, filePath) => {
  cy.readTableDataWithId(tableSelector, headers).then((data) => {
    cy.writeFile(filePath, data);
  });
});

Cypress.Commands.add("clickLink", (label) => {
  cy.contains("h3", label)
    .should("exist")
    .scrollIntoView()
    .parents('[id="products"]')
    .should("exist")
    .find("button")
    .should("be.visible")
    .click({ force: true });
});

Cypress.Commands.add("loginapp", (username, password) => {
  cy.get("input[name='username']").type(username);
  cy.get("input[name='password']").type(password);
  cy.get("input[name='rememberMe']").check();
  cy.get("button[type='submit']").click();
});
