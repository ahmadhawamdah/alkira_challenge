/// <reference types = "cypress" />
const teams = [
    "Wizards",
    "Washington",
    "WAS",
    "East",
    "Southeast",
];

describe("Checks if the last element exist when sorting", () => {
    it("Clocks on sort and checks what the last element is", () => {
        cy.visit("/");
        cy.get('.pl-6 > .cursor-pointer').click();
        cy.get("#30").each((team, i) => {
            cy.wrap(team).should("contain.text",
            (teams)[i]);
        })
    })
})