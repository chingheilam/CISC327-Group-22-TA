## Login Page with Vue and TDesign

This project is a simple login page created using `Vue.js` for frontend and will use `Django` for backend, and using `vitest` to write test scripts.

It includes simulated authentication with visual feedback on login status and input validation.

### Main Prerequisites

Before running this project, make sure you have the following installed on your system:

- Node.js (v16.x or higher recommended)
- npm (comes with Node.js)
- vue@3.5.12
- vue-router@4.4.5
- tdesign-vue-next@1.10.2
- vite@5.4.9
- vitest@2.1.3

### Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/mentlesoul/CISC327-Group-22-TA.git
   cd CISC327-Group-22-TA\Assignment-2
   ```

2. Installation dependencies:

   At the root directory, thus `Assignment-2` folder, run bash/shell command below:

   ```properties
   npm install
   ```

3. Local development launch:

   ```properties
   npm run dev
   ```

   Visit http://localhost:5173/ to view the page.

4. Run test script:

   ```properties
   npm run test:unit
   ```

### Test Case

- Test Case 1: checking the login form rendering
- Test Case 2-4: Simulate the input of an invalid mailbox and test the mailbox validation logic
- Test Case 5: Simulate the input of the correct account and password, test the status change of the button and the processing logic after success
- Test Case 6: Simulate the incorrect account and password, test the status change of the button and the processing logic after the failure
