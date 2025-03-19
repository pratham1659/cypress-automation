const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  videoCompression: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
