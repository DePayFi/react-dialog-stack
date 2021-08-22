import { NavigateStackContext } from '../../src'
import { CloseStackContext } from '../../src'
import React from 'react'

class NumberOneDialog extends React.Component {

  render() {
    return(
      <NavigateStackContext.Consumer>
        {({ navigate, set }) => (
          <CloseStackContext.Consumer>
            {close => (
              <div className='DialogNumber1'>
                <h1>I am Dialog Number 1</h1>
                <button onClick={close}>
                  Close
                </button>
                <button onClick={()=>navigate('NumberTwo')}>
                  Next
                </button>
                <button onClick={()=>set(['New'])}>
                  Set
                </button>
              </div>
            )}
          </CloseStackContext.Consumer>
        )}
      </NavigateStackContext.Consumer>
    )
  }
}

export default NumberOneDialog
