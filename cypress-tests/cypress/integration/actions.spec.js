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

describe('navigate through the application', function () {

    it('check if on project page', function () {
        cy.url().should('include', '/main/projects')
    })

    it('go on account and check the page', function () {
        cy.get('.view-container > :nth-child(2) > :nth-child(3)').eq(0).click({});
        cy.url().should('include', '/main/account')
    })

    it('go on settings and check the page', function () {
        cy.get('.view-container > :nth-child(2) > :nth-child(4)').eq(0).click({});
        cy.url().should('include', '/main/settings')
    })

    it('go on users and check the page', function () {
        cy.get(':nth-child(3) > :nth-child(3)').eq(0).click({});
        cy.url().should('include', '/main/users')
    })

    it('go on languages and check the page', function () {
        cy.get(':nth-child(3) > :nth-child(4)').eq(0).click({});
        cy.url().should('include', '/main/languages')
    })

    it('go to a single project and check the page', function () {
        cy.get(':nth-child(1) > .sidebar-link').eq(0).click({});
        cy.get(':nth-child(1) > app-project > .w-400 > .card').eq(0).click({});
        cy.url().should('include', '/main/tprojects')
    })

    it('go to a single translation project and check the page', function () {
        cy.get(':nth-child(1) > app-translation-project > .w-400 > .card').eq(0).click({});
        cy.url().should('include', '/main/translations')
    })

    it('logout and check if on the login page', function () {
        cy.get('.form-inline > .sidebar-link').eq(0).click({});
        cy.url().should('include', '/login')
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