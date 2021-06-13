import React from 'react'
import ReactDOM from 'react-dom'
import { DemoStack } from '../../demo/src'

describe('navigate ReactDialogStack', () => {
  
  it('allows to navigate to a second dialog', () => {
  
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactDOM.render(
          React.createElement(DemoStack, { document: document, open: true }),
          document.getElementById('app')
        );

        cy.contains('button', 'Next').click()
        cy.contains('h1', 'I am Dialog Number 2').should('exist')
      })
    })
  })

  it('allows to navigate to a third dialog and all the way back to the first', () => {
  
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactDOM.render(
          React.createElement(DemoStack, { document: document, open: true }),
          document.getElementById('app')
        );

        cy.contains('button', 'Next').click()
        cy.contains('h1', 'I am Dialog Number 2').should('exist')
        cy.get('.DialogNumber2').contains('button', 'Next').click()
        cy.contains('h1', 'I am Dialog Number 3').should('exist')
        cy.get('.DialogNumber3').contains('button', 'Back').click()
        cy.contains('h1', 'I am Dialog Number 2').should('exist')
        cy.get('.DialogNumber2').contains('button', 'Back').click()
        cy.contains('h1', 'I am Dialog Number 1').should('exist')
      })
    })
  })

  it('navigates back if click background on stacked dialogs', () => {
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactDOM.render(
          React.createElement(DemoStack, { document: document, open: true }),
          document.getElementById('app')
        );

        cy.get('.DialogNumber1').contains('button', 'Next').click()
        cy.contains('h1', 'I am Dialog Number 2').should('exist')

        cy.get('.ReactDialogStack.active').find('.ReactDialogStackCell').click(1, 1)
        cy.contains('h1', 'I am Dialog Number 1').should('exist')
      })
    })
  })
})
