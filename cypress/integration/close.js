import React from 'react'
import ReactDOM from 'react-dom'
import { DemoStack } from '../../demo/src'

describe('close ReactDialogStack', () => {
  
  it('closes the stack if requested from the parent', () => {
  
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        let root
        var updateStack = function(open) {
          if(typeof root == 'undefined') { root = ReactDOM.createRoot(document.getElementById('app')) }
          root.render(
            React.createElement(DemoStack, { document: document, open: open, close: ()=>updateStack(false) })
          );
        }

        updateStack(true)
        cy.get('h1').should('exist')

        cy.wait(1000).then(()=>{
          updateStack(false)
          cy.get('h1').should('not.exist')
        })
      })
    })
  })

  it('closes the stack if requested from the stack itself e.g. through interactions', () => {
  
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        let root
        var updateStack = function(open) {
          if(typeof root == 'undefined') { root = ReactDOM.createRoot(document.getElementById('app')) }
          root.render(
            React.createElement(DemoStack, { document: document, open: open, close: ()=>updateStack(false) })
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

        let root
        var updateStack = function(open) {
          if(typeof root == 'undefined') { root = ReactDOM.createRoot(document.getElementById('app')) }
          root.render(
            React.createElement(DemoStack, { document: document, open: open, close: ()=>updateStack(false) })
          );
        }

        updateStack(true);

        cy.get('h1').should('exist')

        cy.get('.ReactDialogStack').click(1, 1)

        cy.get('h1').should('not.exist')
      })
    })
  })

  it('closes the stack if entering ESC and ther is only 1 dialog', () => {
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        let root
        var updateStack = function(open) {
          if(typeof root == 'undefined') { root = ReactDOM.createRoot(document.getElementById('app')) }
          root.render(
            React.createElement(DemoStack, { document: document, open: open, close: ()=>updateStack(false) })
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

        let root
        var updateStack = function(open) {
          if(typeof root == 'undefined') { root = ReactDOM.createRoot(document.getElementById('app')) }
          root.render(
            React.createElement(DemoStack, { document: document, open: open, close: ()=>updateStack(false) })
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
