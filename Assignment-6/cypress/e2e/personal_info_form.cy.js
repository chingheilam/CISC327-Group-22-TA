describe('Personal Information Form Tests', () => {
    beforeEach(() => {
      // Visit the page where your component is mounted
      cy.visit('/userPage'); // Update this path to match your app's routing
    });
  
    it('Should save personal information correctly', () => {
      // Fill in valid form data
      cy.get('input[placeholder="ex: Vincent"]').type('John');
      cy.get('input[placeholder="ex: Doe"]').type('Doe');
      cy.get('input[placeholder="Your specific address"]').type('123 Main St');
      cy.get('input[placeholder="ex: ON"]').type('ON');
      cy.get('input[placeholder="L9L L0L"]').type('A1A 1A1');
      cy.get('input[placeholder="yyyy-mm-dd"]').type('1990-01-01');
      cy.get('input[placeholder="Male/Female/Other"]').type('Male');
      cy.get('input[placeholder="Change your email"]').type('john.doe@example.com');
      cy.get('input[type="password"]').type('password123');
  
      // Click the Save Changes button
      cy.get('[data-testid="save-changes-button"]').click();
  
      // Verify that the form fields are cleared after saving
      cy.get('input[placeholder="ex: Vincent"]').should('have.value', '');
      cy.get('input[placeholder="ex: Doe"]').should('have.value', '');
      cy.get('input[placeholder="Your specific address"]').should('have.value', '');
      cy.get('input[placeholder="ex: ON"]').should('have.value', '');
      cy.get('input[placeholder="L9L L0L"]').should('have.value', '');
      cy.get('input[placeholder="yyyy-mm-dd"]').should('have.value', '');
      cy.get('input[placeholder="Male/Female/Other"]').should('have.value', '');
      cy.get('input[placeholder="Change your email"]').should('have.value', '');
      cy.get('input[type="password"]').should('have.value', '');
  
      // Validate that the data was saved in the application's state
      cy.window().then((win) => {
        const savedDetails = win.userDetailsArray[win.userDetailsArray.length - 1]; // Get the last saved user
        expect(savedDetails).to.deep.equal({
          firstName: 'John',
          lastName: 'Doe',
          address: '123 Main St',
          province: 'ON',
          postalCode: 'A1A 1A1',
          dob: '1990-01-01',
          gender: 'Male',
          email: 'john.doe@example.com',
          password: 'password123',
        });
      });
    });
  });
  