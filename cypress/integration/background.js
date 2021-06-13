import React from 'react'
import ReactDOM from 'react-dom'
import { DemoStack } from '../../demo/src'

describe('ReactDialogStack background prop', () => {
  
  it('closes the stack if requested from the parent', () => {
  
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        let updateStack = function(open){
          ReactDOM.render(
            React.createElement(DemoStack, { document: document, open: open, background: 'rgba(255, 255, 255, 0.9)', close: ()=>updateStack(false) }),
            document.getElementById('app')
          );
        }

        updateStack(true)

        cy.get('.ReactDialogBackground').should('have.css', 'background-color', 'rgba(255, 255, 255, 0.9)')
      })
    })
  })
})
