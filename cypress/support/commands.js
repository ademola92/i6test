// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('visitHomepage', () => {
	cy.visit('https://i6.io')
})

Cypress.Commands.add('visitContactUs', () => {
	//configured home url in cypress.config.js so i don't need full url
	cy.visit('/contact-us')
})

Cypress.Commands.add(
	'submitContactUs',
	(firstName, lastName, company, email, phoneNumber, message) => {
		cy.get('[data-name="First Name"]').type(firstName)
		cy.get('[data-name="Last Name"]').type(lastName)
		//cy.get('[data-name="Company"]').type(company)
		cy.get('[data-name="Email"]').type(email)
		//cy.get('[data-name="Number"]').type(phoneNumber)

		//selection
		cy.get('[data-name="Enquiry"]').select('Careers')
		//assertion of selection
		cy.get('[data-name="Enquiry"]').should('have.value', 'Careers')

		cy.get('[data-name="Subscribe to Email"]').check({ force: true })
		//cy.get('[data-name="Message"]').type(message)
		cy.contains('Submit Now').click()
	}
)
