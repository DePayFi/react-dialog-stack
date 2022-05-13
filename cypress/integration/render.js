import React from 'react'
import ReactDOM from 'react-dom'
import { DemoStack } from '../../demo/src'

describe('render ReactDialogStack', () => {
  
  it('renders the "start" Dialog of the ReactDialogStack', () => {
  
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        let root = ReactDOM.createRoot(document.getElementById('app'))
        root.render(
          React.createElement(DemoStack, { document: document, open: true }),
        );

        cy.wait(100).then(()=>{
          expect(
            document.querySelector('h1').innerHTML
          ).to.equal('I am Dialog Number 1')
        })
      })
    })
  })

  it('renders the "start" Dialog of the ReactDialogStack also into an explicit container', () => {
  
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        let root = ReactDOM.createRoot(document.getElementById('app'))
        root.render(
          React.createElement(DemoStack, {
            document: document,
            container: document.getElementById('app'),
            open: true 
          })
        );

        cy.wait(100).then(()=>{
          expect(
            document.querySelector('h1').innerHTML
          ).to.equal('I am Dialog Number 1')
        })
      })
    })
  })
})
