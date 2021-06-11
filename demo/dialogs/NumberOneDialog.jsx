import { CloseStackContext } from '../../src'
import React from 'react'

class NumberOneDialog extends React.Component {

  render() {
    return(
      <CloseStackContext.Consumer>
        {close => (
          <div>
            <h1>I am Dialog Number 1</h1>
            <button onClick={close}>
              Close
            </button>
          </div>
        )}
      </CloseStackContext.Consumer>
    )
  }
}

export default NumberOneDialog
