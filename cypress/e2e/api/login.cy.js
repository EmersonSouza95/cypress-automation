describe('User Authentication Flow', () => {
    before(() => {
        cy.registerUser();
    })

    it('Should perform login successfully', () => {
        cy.loginByApi().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('authorization');
            expect(response.body.message).to.eq('Login realizado com sucesso');
        });
    });

    it('Should block login with incorrectly formatted email', () => {
        cy.loginByApi({ email: 'emailWithoutCorrectFormatting' }).then((response) => {
            cy.log(response.body)
            expect(response.status).to.eq(400);
        });
    });

    it('Should return an error for invalid email or password', () => {
        cy.loginByApi({ password: 'invalidPassword' }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.eq('Email e/ou senha inválidos');
        });
    });
});