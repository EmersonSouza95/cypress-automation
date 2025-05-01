describe('User Authentication Flow', () => {
  before(() => {
    cy.registerUser();
  })

  beforeEach(() => {
    cy.intercept('POST', `${Cypress.env('apiUrl')}/login`).as('loginRequest');
  })

  it('Should perform login successfully', () => {
    cy.loginByUI();

    //API validation as a complement to the test executed on the frontend
    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.all.keys('authorization', 'message');
      expect(interception.response.body.message).to.eq('Login realizado com sucesso')

      //Frontend validation ensuring that the user experience aligns with expectations
      cy.get('[data-testid="home"]').should('contain.text', 'Home');
    });
  })

  it('Should return an error for invalid email or password', () => {
    cy.loginByUI({ email: 'inexistent@mail.com', password: 'userNotFound123' })

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(401);
      expect(interception.response.body).to.have.property('message');
      expect(interception.response.body.message).to.eq('Email e/ou senha inválidos')

      cy.get('.alert').should('contain.text', 'Email e/ou senha inválidos')
    })
  });

  it('Should require filling in mandatory fields', () => {
    cy.visit('https://front.serverest.dev')

    cy.get('[data-testid="entrar"]').click()

    cy.get('.form').eq(0).should('contain', 'Email é obrigatório');
    cy.get('.form').eq(0).should('contain', 'Password é obrigatório');
  })
})