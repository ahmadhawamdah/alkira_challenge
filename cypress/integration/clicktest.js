/// <reference types = "cypress" />

describe("Auto Navigation", () => {
    it("Auto clicks and checks if retrieved", () => {
        cy.visit("/");
        cy.get('#5  > :nth-child(1)').click();
        cy.get('.pl-4 > :nth-child(2) > :nth-child(1)').contains("Chicago Bulls");
    })
})