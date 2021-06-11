import React from 'react'
import ReactDOM from 'react-dom'
import { DemoStack } from '../../demo/src'

describe('close ReactDialogStack', () => {
  
  it('closes the stack if requested from the parent', () => {
  
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        let updateStack = function(open){
          ReactDOM.render(
            React.createElement(DemoStack, { document: document, open: open, close: ()=>updateStack(false) }),
            document.getElementById('app')
          );
        }

        updateStack(true);

        cy.get('h1').should('exist')

        updateStack(false);

        cy.get('h1').should('not.exist')
      })
    })
  })

  it('closes the stack if requested from the stack itself e.g. through interactions', () => {
  
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        let updateStack = function(open){
          ReactDOM.render(
            React.createElement(DemoStack, { document: document, open: open, close: ()=>updateStack(false) }),
            document.getElementById('app')
          );
        }

        updateStack(true);

        cy.get('h1').should('exist')

        cy.contains('button', /^Close$/).click()

        cy.get('h1').should('not.exist')
      })
    })
  })

  it.only('closes the stack if clicking on the stack background', () => {
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        let updateStack = function(open){
          ReactDOM.render(
            React.createElement(DemoStack, { document: document, open: open, close: ()=>updateStack(false) }),
            document.getElementById('app')
          );
        }

        updateStack(true);

        cy.get('h1').should('exist')

        cy.get('.ReactDialogStackCell').click()

        cy.get('h1').should('not.exist')
      })
    })
  })
})
