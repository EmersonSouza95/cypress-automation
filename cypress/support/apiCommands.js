Cypress.Commands.add('registerUser', () => {
    // This custom command registers the user, creating an account to perform login
    cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/usuarios`,
        failOnStatusCode: false,
        log: false,
        body: {
            nome: Cypress.env('name'),
            email: Cypress.env('email'),
            password: Cypress.env('password'),
            administrador: 'true'
        }
    }).then((res) => {
        if (res.status === 201) {
            cy.log('User successfully registered');
        } else if (res.status === 400 && res.body.message.includes('Este email já está sendo usado')) {
            cy.log('User already exists, continuing with tests');
        } else {
            throw new Error(`Unexpected error while registering user: ${res.status}`);
        }
    });
});

Cypress.Commands.add('loginByApi', ({
    // This custom command perform login using API request and saves the session token to use later 
    email = Cypress.env('email'),
    password = Cypress.env('password')
} = {}) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/login`,
        failOnStatusCode: false,
        body: {
            email,
            password,
        },
    }).then((response) => {
        if (response.status === 200) {
            Cypress.env('userToken', response.body.authorization);
        }
        return response;
    });
});
