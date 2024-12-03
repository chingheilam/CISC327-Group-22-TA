import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173", // Sets a base URL for tests
    viewportWidth: 1400,  // Adjust viewport width
    viewportHeight: 900,  // Adjust viewport height 
  },
});
