/// <reference types = "cypress" />

context("Home Page", () => {
    beforeEach(()=> {
        cy.visit("http://localhost:3000/")
    })
    it("should find the main header", () => {
        cy.get("h1").contains("NBA TEAMS");
    });
});