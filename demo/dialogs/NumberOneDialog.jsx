import { NavigateStackContext } from '../../src'
import { CloseStackContext } from '../../src'
import React from 'react'

class NumberOneDialog extends React.Component {

  render() {
    return(
      <NavigateStackContext.Consumer>
        {({ navigate, set, hide }) => (
          <CloseStackContext.Consumer>
            {close => (
              <div className='DialogNumber1 Dialog'>
                <div>
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
                  <button onClick={()=>{
                    hide('forward')
                    setTimeout(()=>window.updateAnotherStack(true, 'forward'), 100)
                  }}>
                    Stack Stack
                  </button>
                </div>
              </div>
            )}
          </CloseStackContext.Consumer>
        )}
      </NavigateStackContext.Consumer>
    )
  }
}

export default NumberOneDialog
