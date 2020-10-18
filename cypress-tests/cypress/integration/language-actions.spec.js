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
    let preStatelanguages = 3;
    let postStatelanguages = 4;

    it('Try to create a language', function () {
        cy.get(':nth-child(3) > :nth-child(4)').eq(0).click({});
        cy.url().should('include', '/main/languages')

        // click the create language icon
        cy.get('.content-title > .fa').eq(0).click({});

        // handle create language modal
        cy.get(':nth-child(3) > #title').eq(0).type('xxxx language');
        cy.get(':nth-child(4) > #title').eq(0).type('ES');
        cy.get('.btn-success').eq(0).click({});

        // validate number of languages (should be +1 to before)
        cy.wait(500);
        cy.get('tbody').children().its('length').should('eq', postStatelanguages);
    })

    it('Try to create duplicate language', function () {
        // click the create language icon
        cy.get('.content-title > .fa').eq(0).click({});

        // handle create language modal
        cy.get(':nth-child(3) > #title').eq(0).type('xxxx language');
        cy.get(':nth-child(4) > #title').eq(0).type('ES');
        cy.get('.btn-success').eq(0).click({});

        // validate number of languages (should be the same as before, because a duplicate can not be created)
        cy.get('tbody').children().its('length').should('eq', postStatelanguages);
    })

    it('Try to edit a language', function () {
        // click the edit project icon of the new project
        cy.get(':nth-child(' + postStatelanguages + ') > :nth-child(4) > .btn-primary').eq(0).click({});

        // handle edit project modal
        cy.get(':nth-child(3) > #title').eq(0).clear().type('Updated language');
        cy.get(':nth-child(4) > #title').eq(0).clear().type('PL');
        cy.get('.btn-success').eq(0).click({});

        // validate edited project title and description
        cy.get('tbody > :nth-child(' + postStatelanguages + ') > :nth-child(2)').should('contain', 'Updated language');
        cy.get('tbody > :nth-child(' + postStatelanguages + ') > :nth-child(3)').should('contain', 'PL');
    })

    it('Try to delete a language', function () {
        // click the delete project icon of the new project
        cy.get(':nth-child(' + postStatelanguages + ') > :nth-child(4) > .btn-danger').eq(0).click({});
        cy.get(':nth-child(5) > #modal-6 > .modal-dialog > .modal-content > .text-right > .btn-danger').eq(0).click({});
        cy.wait(500);

        // validate number of projects (should be the previous number of projects so -1)
        cy.get('.row').children().its('length').should('eq', preStatelanguages);
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