describe('Product Search Validation Flow', () => {
  before(() => {
    cy.registerUser();
  })

  beforeEach(() => {

    /*
    This beforeEach performs login through API and injects into browser's local storage
    the properties necessary to access the targeted test page without performing login by UI.
    */

    cy.loginByApi().then(({ token, email }) => {
      cy.visit(`${Cypress.env('frontendUrl')}/home`, {
        onBeforeLoad(win) {
          win.localStorage.setItem('serverest/userToken', "Bearer " + token);
          win.localStorage.setItem('serverest/userEmail', email);
        },
      });
    });
    cy.intercept('GET', '**/produtos?**').as('getProdutos');
  });

  it('Add product to shopping list', () => {
    cy.addProductFromHomePage('Rustic Marble Ball', 1)

    //Compares the data stored in the fixture with the browser's localStorage
    cy.fixture('products.json').then((produtos) => {
      const { _id, nome, preco, quantidade, amount } = produtos.find(p => p._id === 'EmVF2SNL7ybDWLxv');

      cy.window().then((win) => {
        const produtoArmazenado = JSON.parse(win.localStorage.getItem('products'))
          .find(p => p._id === 'EmVF2SNL7ybDWLxv');

        expect(produtoArmazenado).to.include({ _id, nome, preco, quantidade, amount });
      });
    });

    cy.get('h1').should('have.text', 'Lista de Compras');
  })

  it('Searches for a nonexistent product', () => {
    cy.get('[data-testid="pesquisar"]').type('produto inexistente', { delay: 0 });
    cy.get('[data-testid="botaoPesquisar"]').click();

    cy.wait('@getProdutos').then((interception) => {
      expect(interception.response.body.quantidade).to.eq(0)
    })

    cy.get('p').should('have.text', "Nenhum produto foi encontrado")
  })

})