describe('Flight Search', () => {
    it('should perform a flight search from Toronto to Vancouver', () => {
        // Step 1: Visit the website using baseUrl from Cypress config
        cy.visit('http://localhost:5173');
        cy.contains('Book Flights With Us').should('be.visible');
        
        // Step 2: Select the "From" dropdown and choose "Toronto"
        cy.contains('button', 'Input Origin').should('be.visible').click();
        cy.contains('Toronto (YYZ)').should('be.visible').click();

        // Step 3: Select the "To" dropdown and choose "Vancouver"
        cy.contains('button', 'Input Destination').should('be.visible').click();
        cy.contains('Vancouver (YVR)').should('be.visible').click();

        // Step 4: Click on the date picker input to open the date picker panel
        cy.get('input[placeholder="Choose Dates"]').should('be.visible').click();
        
        // Ensure the date picker is rendered
        cy.get('.t-date-picker__panel-content').should('be.visible');
        
        // Step 5: Click on the year dropdown to open year selection
        cy.get('.t-date-picker__header-controller-year').should('be.visible').click();

        // Step 6: Select the correct year (2024) from the year list
        cy.get('ul.t-select__list:visible')
            .first()
            .find('li.t-select-option')
            .contains('2024')
            .should('be.visible')
            .click();

        // Step 7: Click on the month dropdown to open month selection
        cy.get('.t-date-picker__header-controller-month').should('be.visible').click();

        // Step 8: Select the correct month (August)
        cy.get('ul.t-select__list:visible')
            .first()
            .find('li.t-select-option[title="8 月"]')
            .should('exist') 
            .should('be.visible') 
            .click();

        // Step 9: Select the specific day (e.g., 6th of August)
        cy.get('.t-date-picker__cell')
            .contains('6')
            .should('be.visible')
            .click();

        // Step 10: Click the Search button
        cy.get('button').contains('Search').should('be.visible').click();

        // Step 11: Check that the results page loads correctly
        cy.url().should('include', '/flights?departure=Toronto+(YYZ)&arrival=Vancouver+(YVR)&date=2024-08-06');

        cy.contains('Flight Detail').should('be.visible'); // Ensure flight results are visible
        cy.contains('NAN').should('be.visible'); // Ensure flight results are visible with flight number
        cy.contains('Toronto').should('be.visible');
        cy.contains('Vancouver').should('be.visible');
        cy.contains('$').should('be.visible');
        cy.contains('Economy').should('be.visible');
        cy.contains('Premium Eco').should('be.visible');
        cy.contains('First / Business').should('be.visible');
    });
});
