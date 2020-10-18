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

describe('project actions', function () {
    let preStateprojects = 3;
    let postStateprojects = 4;

    it('Try to create a project', function () {
        cy.url().should('include', '/main/projects')

        // click the create project icon
        cy.get('.content-title > .fa').eq(0).click({});

        // handle create project modal
        cy.get('#title').eq(0).type('New project');
        cy.get(':nth-child(4) > .form-control').eq(0).type('A description for the project');
        cy.get('.btn-success').eq(0).click({});

        // validate number of projects (should be +1 to before)
        cy.wait(500);
        cy.get('.row').children().its('length').should('eq', postStateprojects);
    })

    it('Try to create duplicate project', function () {
        // click the create project icon
        cy.get('.content-title > .fa').eq(0).click({});

        // handle create project modal
        cy.get('#title').eq(0).type('New project');
        cy.get(':nth-child(4) > .form-control').eq(0).type('A description for the project');
        cy.get('.btn-success').eq(0).click({});

        // validate number of projects (should be the same as before, because a duplicate can not be created)
        cy.get('.row').children().its('length').should('eq', postStateprojects);
    })

    it('Try to edit a project', function () {
        // click the edit project icon of the new project
        cy.get(':nth-child(' + postStateprojects + ') > app-project > .w-400 > .card > .card-title > :nth-child(4) > #edit').eq(0).click({});

        // handle edit project modal
        cy.get('#title').eq(0).clear().type('Updated project');
        cy.get(':nth-child(4) > .form-control').eq(0).clear().type('A new description');
        cy.get('.btn-primary').eq(0).click({});

        // validate edited project title and description
        cy.get(':nth-child(' + postStateprojects + ') > app-project > .w-400 > .card > .card-title > .project-name').should('contain', 'Updated project');
        cy.get(':nth-child(' + postStateprojects + ') > app-project > .w-400 > .card > .text-left').should('contain', 'A new description');
    })

    it('Try to delete a project', function () {
        // click the delete project icon of the new project
        cy.get(':nth-child(' + postStateprojects + ') > app-project > .w-400 > .card > .card-title > :nth-child(3) > #delete').eq(0).click({});
        cy.get('.btn-danger').eq(0).click({});
        cy.wait(500);

        // validate number of projects (should be the previous number of projects so -1)
        cy.get('.row').children().its('length').should('eq', preStateprojects);
    })

})

describe('translation project actions', function () {
    let preStateprojects = 3;
    let postStateprojects = 4;

    it('Try to create a translation project', function () {
        cy.get(':nth-child(1) > app-project > .w-400 > .card').eq(0).click({});
        cy.url().should('include', '/main/tprojects/1')

        // click the create project icon
        cy.get('.content-title > .fa').eq(0).click({});

        // handle create project modal
        cy.get(':nth-child(6) > .modal > .modal-dialog > .modal-content > :nth-child(3) > #title').eq(0).type('New project');
        cy.get(':nth-child(6) > .modal > .modal-dialog > .modal-content > :nth-child(4) > .form-control').eq(0).type('A description for the project');
        cy.get('.btn-success').eq(0).click({});

        // validate number of projects (should be +1 to before)
        cy.wait(500);
        cy.get('.row').children().its('length').should('eq', postStateprojects);
    })

    it('Try to create duplicate translation project', function () {
        // click the create project icon
        cy.get('.content-title > .fa').eq(0).click({});

        // handle create project modal
        cy.get(':nth-child(6) > .modal > .modal-dialog > .modal-content > :nth-child(3) > #title').eq(0).type('New project');
        cy.get(':nth-child(6) > .modal > .modal-dialog > .modal-content > :nth-child(4) > .form-control');
        cy.get('.btn-success').eq(0).click({});

        // validate number of projects (should be the same as before, because a duplicate can not be created)
        cy.get('.row').children().its('length').should('eq', postStateprojects);
    })

    it('Try to edit a translation project', function () {
        // click the edit project icon of the new project
        cy.get(':nth-child(' + postStateprojects + ') > app-translation-project > .w-400 > .card > .card-title > :nth-child(4) > #edit').eq(0).click({});

        // handle edit project modal
        cy.get(':nth-child(6) > .modal > .modal-dialog > .modal-content > :nth-child(3) > #title').eq(0).clear().type('Updated project');
        cy.get(':nth-child(6) > .modal > .modal-dialog > .modal-content > :nth-child(4) > .form-control').eq(0).clear().type('A new description');
        cy.get(':nth-child(6) > .modal > .modal-dialog > .modal-content > .text-right > .btn-primary').eq(0).click({});

        // validate edited project title and description
        cy.get(':nth-child(' + postStateprojects + ') > app-translation-project > .w-400 > .card > .card-title > .project-name').should('contain', 'Updated project');
        cy.get(':nth-child(' + postStateprojects + ') > app-translation-project > .w-400 > .card > .text-left').should('contain', 'A new description');
    })

    it('Try to delete a translation project', function () {
        // click the delete project icon of the new project
        cy.get(':nth-child(' + postStateprojects + ') > app-translation-project > .w-400 > .card > .card-title > :nth-child(3) > #delete').eq(0).click({});
        cy.get(':nth-child(7) > #modal-6 > .modal-dialog > .modal-content > .text-right > .btn-danger').eq(0).click({});
        cy.wait(500);

        // validate number of projects (should be the previous number of projects so -1)
        cy.get('.row').children().its('length').should('eq', preStateprojects);
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