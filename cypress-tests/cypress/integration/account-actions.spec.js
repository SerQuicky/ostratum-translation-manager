describe('ostratum login', function () {

    it('Open the ostratum webclient', function () {
        cy.visit('http://localhost:4200/');
    })

    it('Sign in the as an admin', function () {
        window.localStorage.setItem('aot', "123")
        cy.get('input').eq(0).type('Administrator')
        cy.get('input').eq(1).type('A12')
        cy.get('button').eq(0).click({});
    })
})

describe('account actions', function () {

    it('Update account password', function () {
        // move to the account settings
        cy.get('.view-container > :nth-child(2) > :nth-child(3)').eq(0).click({});
        cy.url().should('include', '/main/account')

        // update the password
        cy.get(':nth-child(2) > .form-control').eq(0).clear().type('A12');
        cy.get(':nth-child(3) > .form-control').eq(0).clear().type('A13');
        cy.get('.btn').eq(0).click({});
    })

    it('Validate new password and set it back', function () {
        // return to the login page and sign in with the current credentials
        cy.get('.form-inline > .sidebar-link').eq(0).click({});
        cy.get('input').eq(0).type('Administrator')
        cy.get('input').eq(1).type('A13')
        cy.get('.btn').eq(0).click({});

        // move to the account settings
        cy.get('.view-container > :nth-child(2) > :nth-child(3)').eq(0).click({});
        cy.url().should('include', '/main/account')

        // update the password
        cy.get(':nth-child(2) > .form-control').eq(0).clear().type('A13');
        cy.get(':nth-child(3) > .form-control').eq(0).clear().type('A12');
        cy.get('.btn').eq(0).click({});
    })
})

let LOCAL_STORAGE_MEMORY = {};


beforeEach(() => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
});

afterEach(() => {
    Object.keys(localStorage).forEach(key => {
        LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
});