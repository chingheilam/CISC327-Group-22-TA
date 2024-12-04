## Login Page with Vue and TDesign

This project is a simple login page created using `Vue.js` for frontend and use `Django` for backend, using `vitest` and `cypress` to write test scripts.

It includes simulated authentication with visual feedback on login status and input validation.

In some of the comments, we have chosen to use bilingualism.

### Main Prerequisites

Before running this project, make sure you have the following installed on your system:

- Node.js (v16.x or higher recommended)
- npm (comes with Node.js)

### Getting Started

For all commands that are not specified, the execution path is the Assignment root directory

1. Clone the repository:

   ```bash
   git clone https://github.com/mentlesoul/CISC327-Group-22-TA.git
   cd CISC327-Group-22-TA\Assignment-6
   ```

2. Installation dependencies:

   At the root directory, thus `Assignment-6` folder, run bash/shell command below:

   ```properties
   npm install
   ```

3. Local development launch:

   ```properties
   npm run dev
   ```

   Visit http://localhost:5173/ to view the page.

   ```properties
   cd backend
   python manage.py runserver
   ```

   To run the Django backend service

4. Run test script by using default method created by vue3:

   ```properties
   npm run test:unit
   ```

5. Open a terminal in the project directory and use one of the following commands to run the test script:

   ```properties
   npx cypress open
   ```

   Opens the Cypress Test Runner UI, where you can manually select the test to run.

   or

   ```properties
   npx cypress run
   ```

   Runs the test script directly in the terminal, without the UI.

| Name           | Work                                        |
| -------------- | ------------------------------------------- |
| Lam, Ching Hei | Index Page Module & Flight Searching Module |
| Xie, Mingyang  | Login Module                                |
| Zhou, Xuhong   | User Page Module                            |
