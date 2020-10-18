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

describe('user actions', function () {
    let preStateusers = 3;
    let postStateusers = 4;

    it('Try to create a user', function () {
        cy.get(':nth-child(3) > :nth-child(3)').eq(0).click({});
        cy.url().should('include', '/main/users')

        // click the create user icon
        cy.get('.content-title > .fa').eq(0).click({});

        // handle create user modal
        cy.get('app-user-modal > .modal > .modal-dialog > .modal-content > :nth-child(3) > #title').eq(0).type('xxxx user');
        cy.get(':nth-child(4) > #title').eq(0).type('1234');
        cy.get('.btn-success').eq(0).click({});

        // validate number of users (should be +1 to before)
        cy.wait(500);
        cy.get('tbody').children().its('length').should('eq', postStateusers);
    })

    it('Try to create duplicate user', function () {
        // click the create user icon
        cy.get('.content-title > .fa').eq(0).click({});

        // handle create user modal
        cy.get('app-user-modal > .modal > .modal-dialog > .modal-content > :nth-child(3) > #title').eq(0).type('xxxx user');
        cy.get(':nth-child(4) > #title').eq(0).type('1234');
        cy.get('.btn-success').eq(0).click({});

        // validate number of users (should be the same as before, because a duplicate can not be created)
        cy.get('tbody').children().its('length').should('eq', postStateusers);
    })

    it('Try to edit a user', function () {
        // click the edit project icon of the new project
        cy.get(':nth-child(' + postStateusers + ') > :nth-child(4) > .btn-primary').eq(0).click({});

        // handle edit project modal
        cy.get(':nth-child(3) > #title').eq(0).clear().type('Updated user');
        cy.get(':nth-child(4) > #title').eq(0).clear().type('NewPassword');
        cy.get('.btn-success').eq(0).click({});

        // validate edited project title and description
        cy.get('tbody > :nth-child(' + postStateusers + ') > :nth-child(2)').should('contain', 'Updated user');
    })

    it('Try to delete a user', function () {
        // click the delete project icon of the new project
        cy.get(':nth-child(' + postStateusers + ') > :nth-child(4) > .btn-danger').eq(0).click({});
        cy.get('.text-right > .btn-danger').eq(0).click({});
        cy.wait(500);

        // validate number of projects (should be the previous number of projects so -1)
        cy.get('.row').children().its('length').should('eq', preStateusers);
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