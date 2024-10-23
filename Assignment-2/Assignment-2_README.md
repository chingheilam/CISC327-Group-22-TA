
# Project Instructions

## How to Run the Project and Execute Test Scripts

### Prerequisites

Before running the project, ensure you have the following installed on your machine:

1. **Node.js** (v14 or above)
2. **npm** (v6 or above)
3. **Vue.js** (v3)
4. **Vitest** (for running unit tests)
5. **Flush Promises** (used for handling asynchronous promises in tests)

### Steps to Run the Project

1. **Clone the Repository**
   If you haven't already, clone the project repository from your version control system:
   
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install Project Dependencies**
   Inside the project folder, install all the required dependencies:
   
   ```bash
   npm install
   ```

3. **Run the Project**
   To run the project locally, use the following command:

   ```bash
   npm run dev
   ```

   This will start a local development server. You can access the project in your browser at `http://localhost:8080` or the port number specified by your terminal.

### Running Unit Tests

1. **Ensure Vitest is Installed**
   Vitest is used to run the unit tests in this project. If it's not installed globally, install it by running:
   
   ```bash
   npm install vitest --save-dev
   ```

2. **Install `flush-promises`**
   Flush promises is used to handle asynchronous updates in the tests. Install it with:

   ```bash
   npm install flush-promises --save-dev
   ```

3. **Run Unit Tests**
   To run the unit tests, execute the following command:

   ```bash
   npm run test
   ```

   This command will execute all test scripts, including the ones located in the `src/components/__tests__/unit/` folder. 

   You should see a report of passed and failed tests in the terminal.

4. **Running Tests in Watch Mode**
   If you want to continuously run the tests and watch for changes, use:

   ```bash
   npm run test:watch
   ```

### Troubleshooting

- If tests are failing, ensure that the necessary components and mocks are correctly defined in the test files.
- If the project does not start, verify that the dependencies are correctly installed by running `npm install` again.
- If there are permission issues, try running commands with `sudo`.

### Notes

- The main test scripts are located in the `src/components/__tests__/unit/` folder. Tests ensure that form validation, card options, and other features are working as expected.
- In case of asynchronous test failures, you can use `flush-promises` to ensure all asynchronous actions are completed before assertions.

---

This README-first file should be located in the `Assignment-2` folder of your project.
