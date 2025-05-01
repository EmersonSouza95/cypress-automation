# Cypress Test Automation Project
This project automates key flows of an online shopping system, covering both UI and API testing using Cypress features.

# Technologies Used
- Cypress
- JavaScript
- Node.js + NPM
- Mocha + Chai
- REST API
- Custom Commands
- Fixtures

# Implemented Tests
## UI - Login
- Should perform a successful login
- Should display an error for invalid email and/or password
- Should require filling in mandatory fields

## UI - Products
- Adds a product to the shopping list
- Searches for a nonexistent product

## API tests
- Should perform login successfully
- Should block login with incorrectly formatted email
- Should return an error for invalid email or password
- Should list products using a valid token for the request

# Context and Rationale Behind Decisions
- Sensitive data not versioned in this repository (the cypress.env.json file) is provided at the end of this document. If you want to run the tests exactly as I did, just create a cypress.env.json file and paste the provided data.

- Custom Commands were used to reuse repetitive code for both frontend and backend.

- I implemented API call validations even in frontend tests as an extra assertion layer. While not always necessary, it can be useful in more critical scenarios, depending on the project context.

- API and frontend tests were separated for better project organization.

- A basic fixture file was added to improve organization and separation between test logic and test data.

- A possible improvement in the frontend tests would be to identify repetitive validation flows and encapsulate recurring assertions, reducing code duplication and improving test readability.

- NPM scripts were added to simplify test execution and validation.

# Non-versioned File Required to Run the Tests (cypress.env.json)
<pre>{
    "name": "QA Tester",
    "email": "emerson.sample@mail.com",
    "password": "safePassword123",
    "frontendUrl": "https://front.serverest.dev",
    "apiUrl": "https://serverest.dev"
}</pre>


## Setup to Run the Project
### Install dependencies
<pre>npm install</pre>

### Run tests in interactive mode
<pre>npx cypress open</pre>

### Run tests in headless mode
<pre>npx cypress run</pre>