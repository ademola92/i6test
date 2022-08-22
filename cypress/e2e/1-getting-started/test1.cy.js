/// <reference types="cypress" />

describe('Contact us', () => {
	before(function () {
		//Can use this to run before functions like the commands below
		//cy.visit('https://i6.io')
		//cy.visit('/')
	})

	it('User is navigated to homepage', () => {
		cy.visitHomepage()
		cy.log('i6 homepage has been loaded')
	})

	it('Click on About and Select the Contact Us button', () => {
		cy.get('[data-w-id="68aaf9ee-5fcc-6065-4ad6-0de5a89a23c9"]').click()
		//verify user on about page
		cy.url().should('include', 'about')

		cy.contains('Contact Us').scrollIntoView()
		cy.get('[data-w-id="758b64f6-20a6-26ae-37c7-1ac812bd2e61"]').click()
		//verify user on contact us page
		cy.url().should('include', 'contact-us')

		//Verify placeholders
		cy.get('[data-name="First Name"]')
			.invoke('attr', 'placeholder')
			.should('contain', 'e.g. Pete')

		cy.get('[data-name="Last Name"]')
			.invoke('attr', 'placeholder')
			.should('contain', 'e.g. Mitchell')

		cy.get('[data-name="Company"]')
			.invoke('attr', 'placeholder')
			.should('contain', 'Top Gun Airlines')

		cy.get('[data-name="Email"]')
			.invoke('attr', 'placeholder')
			.should('contain', 'e.g. petemitchell@topgunairlines.com')

		cy.get('[data-name="Number"]')
			.invoke('attr', 'placeholder')
			.should('contain', '+44 0123456789')

		cy.get('[data-name="Message"]')
			.invoke('attr', 'placeholder')
			.should('contain', 'Type your message here')
	})

	it('On the Contact Us Page enter the following details and check the validation messages appear', () => {
		cy.visitContactUs()
		cy.contains('Submit Now').click()
		//	there should be 6 errors
		cy.get('input:invalid').should('have.length', 6)

		cy.fixture('contactUsData').then(
			({ firstName, lastName, company, email, phoneNumber, message }) => {
				cy.submitContactUs(
					firstName,
					lastName,
					company,
					email,
					phoneNumber,
					message
				)
			}
		)
	})

	it('Validating entry fields in contact us', () => {
		//click submit
		cy.contains('Submit Now').click()
		//	check for invalid errors
		cy.get('input:invalid').should('have.length', 3)
		//cy.screenshot({ capture: 'fullPage' })
	})
})
