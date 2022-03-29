/// <reference types = "cypress" />
const teams = [
    "Hawks",
    "Atlanta",
    "ATL",
    "East",
    "Southeast",
];

describe("Type and search test", () => {
    it("types hawks and checks if filtered correclty", () => {
        cy.visit("/");
        cy.get('.flex-grow').clear();
        cy.get('.flex-grow').type('hawks');
        cy.get(".teams").each((team, i) => {
            cy.wrap(team).should("contain.text",
            (teams)[i]);
        })
    })
})