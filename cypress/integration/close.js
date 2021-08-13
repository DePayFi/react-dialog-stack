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

  it('closes the stack if clicking on the stack background', () => {
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

        cy.get('.ReactDialogStackCell').click(1, 1)

        cy.get('h1').should('not.exist')
      })
    })
  })

  it('closes the stack if entering ESC and ther is only 1 dialog', () => {
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

        cy.get('body').type('{esc}')

        cy.get('h1').should('not.exist')
      })
    })
  })

  it('resets navigation stack when stack closes and starts over again', () => {
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        let updateStack = function(open){
          ReactDOM.render(
            React.createElement(DemoStack, { document: document, open: open, close: ()=>updateStack(false) }),
            document.getElementById('app')
          );
        }

        updateStack(true);

        cy.contains('button', 'Next').click()
        cy.contains('h1', 'I am Dialog Number 2').should('exist')
        cy.get('.DialogNumber2').contains('button', 'Next').click()
        cy.contains('h1', 'I am Dialog Number 3').should('exist')
        cy.get('.DialogNumber3').contains('button', 'Close').click()
        
        updateStack(true);
        
        cy.contains('h1', 'I am Dialog Number 1').should('exist')
      })
    })
  })
})
