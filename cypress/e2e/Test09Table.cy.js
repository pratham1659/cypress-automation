describe("Table Operations", () => {
  beforeEach("login", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
    cy.get("a[href='/tables']").click();
  });

  it("Check number rows and columns", () => {
    cy.get("#mytable > tbody > tr").should("have.length", 5);

    cy.get("table[class='w-full border-collapse border border-gray-300 rounded-lg shadow-md'] > thead >tr > th").should("have.length", 4);
  });

  it("Check cell data from specific rows & column", () => {
    cy.get("tbody tr:nth-child(4) td:nth-child(2)").contains("Emily Brown");
  });

  it("Read all the rows & columns data in first page", () => {
    cy.get("table[id='mytable'] > tbody > tr").each(($row, index, $rows) => {
      cy.wrap($row).within(() => {
        cy.get("td").each(($col, index, $cols) => {
          cy.log($col.text().trim()); // Logs each cell's text
        });
      });
    });
  });

  it("Read all the rows and column and save in json", () => {
    const tableData = [];
    const headers = ["check", "Name", "Age", "Grade"];

    cy.get("table[id='mytable'] > tbody > tr")
      .each(($row) => {
        const rowData = {};

        cy.wrap($row)
          .find("td")
          .each(($cell, index) => {
            if (index !== 0) {
              // Skip the checkbox column
              rowData[headers[index]] = $cell.text().trim();
            }
          })
          .then(() => {
            tableData.push(rowData);
          });
      })
      .then(() => {
        cy.writeFile("cypress/fixtures/tableData.json", JSON.stringify(tableData, null, 2));
      });
  });

  it("Read Table Data using Custom Function", () => {
    const headers = ["check", "Name", "Age", "Grade"]; // Define headers

    cy.get("button:last-child").click();
    cy.readTableData("#mytable", headers, "tableData");
  });

  it("Read Table Data only Name Function", () => {
    // Find total number of pages
    cy.get("p.text-lg.font-semibold").then((e) => {
      const totalResults = parseInt(e.text().match(/\d+/)[0]); // Extract total count
      const rowsPerPage = 5;
      const totalPages = Math.ceil(totalResults / rowsPerPage);
      cy.log("Total Pages:", totalPages);

      for (let page = 1; page <= totalPages; page++) {
        if (totalPages > 1) {
          cy.log("Active page is === " + page);

          cy.get(`div[id='pagination'] > button:nth-child(${page + 1})`)
            .should("be.visible")
            .click();

          cy.get("#mytable").should("not.be.empty");

          cy.get("table[id='mytable'] > tbody > tr").each(($row, index, $rows) => {
            cy.wrap($row).within(() => {
              cy.get("td:nth-child(2)").then((e) => {
                cy.log(e.text());
              });
            });
          });
        }
      }
    });
  });

  it.only("Pagination", () => {
    const headers = ["Name", "Age", "Grade"];
    let allTableData = []; // Store data for all pages

    // Find total number of pages
    cy.get("p.text-lg.font-semibold").then((e) => {
      const totalResults = parseInt(e.text().match(/\d+/)[0]); // Extract total count
      const rowsPerPage = 5;
      const totalPages = Math.ceil(totalResults / rowsPerPage);

      cy.log("Total Pages:", totalPages);

      // Use Cypress chaining to ensure sequential execution
      cy.wrap([...Array(totalPages).keys()])
        .each((pageIndex) => {
          const pageNumber = pageIndex + 1;
          cy.log("Active page is === " + pageNumber);

          cy.get(`div[id='pagination'] > button:nth-child(${pageNumber + 1})`)
            .should("be.visible")
            .click();

          // Wait for table data to change (better than `cy.wait(1000)`)
          cy.get("#mytable").should("not.be.empty");

          cy.readTableDataWithId("#mytable", headers).then((data) => {
            allTableData.push(...data); // Collect data without writing to file
          });
        })
        .then(() => {
          cy.writeFile("cypress/fixtures/tableData.json", allTableData); // Write data only once
        });
    });
  });
});
