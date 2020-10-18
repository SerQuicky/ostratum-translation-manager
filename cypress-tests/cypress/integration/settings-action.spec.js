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

describe('language actions', function () {

    it('Set german as the default language', function () {
        cy.get('.view-container > :nth-child(2) > :nth-child(4)').eq(0).click({});
        cy.url().should('include', '/main/settings')

        // validate current language (should be english)
        cy.get('.container-fluid > :nth-child(1) > :nth-child(1) > .content-title').should('contain', 'Language settings');

        // choose german as the default language and check if a text was translated
        cy.get(':nth-child(2) > .country-icon').eq(0).click({});
        cy.get('.container-fluid > :nth-child(1) > :nth-child(1) > .content-title').should('contain', 'Spracheinstellungen');
    })

    it('Activate the dark mode', function () {
        // choose darkmode and validate
        cy.get(':nth-child(2) > .card > img').eq(0).click({});
        cy.get('body').should('have.class', 'dark-mode')
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