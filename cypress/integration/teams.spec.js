/// <reference types = "cypress" />

const teams = [
    "name",
    "city",
    "abbreviation",
    "conference",
    "division",
];

context("Teams Page", () => {
    beforeEach(()=> {
        cy.visit("http://localhost:3000/")
    })
    it ("Checks if the teams are retrieved", () => {
        cy.get(".teams").each((team, i) => {
            cy.wrap(team).should("be.visible",
            (teams)[i]);
        })
    })
});