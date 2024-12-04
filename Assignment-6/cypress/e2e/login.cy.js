describe('Login Functionality Test', () => {
  // visit login page before each test
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
  })

  it('Successfully log in with valid credentials', () => {
    // Correct email address and passwd
    cy.get('input[placeholder="Email Address *"]').type('user@example.com')
    cy.get('input[placeholder="Password *"]').type('password')

    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/')
  })

  it('should display error message for incorrect password', () => {
    // Correct email address and wrong passwd
    cy.get('input[placeholder="Email Address *"]').type('testuser@example.com')
    cy.get('input[placeholder="Password *"]').type('wrongpassword')

    cy.get('button[type="submit"]').click()

    cy.contains('Invalid email or password').should('be.visible')
  })

  it('should display error message for invalid email', () => {
    // Wrong email address and passwd
    cy.get('input[placeholder="Email Address *"]').type(
      'nonexistentuser@example.com',
    )
    cy.get('input[placeholder="Password *"]').type('anyPassword')

    cy.get('button[type="submit"]').click()

    cy.contains('Invalid email or password').should('be.visible')
  })
})
