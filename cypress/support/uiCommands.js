Cypress.Commands.add('loginByUI', ({ email = Cypress.env('email'), password = Cypress.env('password') } = {}) => {
    // The sole responsibility of this custom command is to navigate to the login screen and simulate authentication through the GUI
    // The parameters of this custom command are destructured to allow flexible and individual manipulation of the variables

    cy.visit(Cypress.env('frontendUrl'));

    cy.get('#email').type(email, { delay: 0 });
    cy.get('#password').type(password, { delay: 0 });
    cy.get('[data-testid="entrar"]').click()
});

Cypress.Commands.add('addProductFromHomePage', (expectedProduct, expectedProductQuantity) => {
    cy.get('[data-testid="pesquisar"]').type(expectedProduct, { delay: 0 });
    cy.get('[data-testid="botaoPesquisar"]').click();

    cy.wait('@getProdutos').then(({ response: { body: { quantidade, produtos } } }) => {
        expect(quantidade).to.eq(expectedProductQuantity);
        expect(produtos[0].nome).to.eq(expectedProduct);

        cy.get('.card-title').should('have.text', expectedProduct);
        cy.get('[data-testid="adicionarNaLista"]').click();
    });
});
