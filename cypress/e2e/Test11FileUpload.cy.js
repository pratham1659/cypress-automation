describe("Action and Drag Operations", () => {
  beforeEach("login", () => {
    cy.visit("https://selenium-test-react.vercel.app/");
    cy.title().should("eq", "Selenium Web");
    cy.get("a[href='/fileupload']").click();
  });

  it("Single File Upload", () => {
    cy.get("#fileInput").attachFile("Test01.pdf");

    cy.xpath("//button[.='Upload Files']").click();
    cy.wait(1000);

    cy.get(".list-disc > .text-gray-700").should("have.text", "Test01.pdf");
  });

  it("File Upload - Rename", () => {
    // Generate timestamp for unique filename
    const timestamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\..+/, "");
    const uniqueFileName = `testfile_${timestamp}.pdf`;

    // Upload file with dynamic name
    cy.get("#fileInput").attachFile({
      filePath: "Test01.pdf",
      fileName: uniqueFileName,
    });

    cy.xpath("//button[.='Upload Files']").click();

    // Verify upload with dynamic filename
    cy.get(".list-disc > .text-gray-700").should("be.visible").and("have.text", uniqueFileName);
  });

  it("File Upload drag and Drop", () => {
    cy.get("#fileInput").attachFile("Test01.pdf", { subjectType: "drag-n-drop" });
    cy.wait(1000);
    cy.xpath("//button[.='Upload Files']").click();

    cy.get(".list-disc > .text-gray-700").should("be.visible").and("have.text", "Test01.pdf");
  });

  it.only("Multiple Files Upload", () => {
    const testFiles = ["Test01.pdf", "Test02.pdf", "Test03.pdf"];

    // Upload multiple files
    cy.get("#fileInput").attachFile(
      testFiles.map((fileName) => ({
        filePath: fileName,
        fileName: fileName,
      }))
    );

    cy.contains("button", "Upload Files").click();

    testFiles.forEach((item, index) => {
      cy.get(`.list-disc > :nth-child(${index + 1})`).should("have.text", item);
    });
  });
});
