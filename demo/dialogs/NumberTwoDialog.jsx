import { CloseStackContext } from '../../src'
import { NavigateStackContext } from '../../src'
import React from 'react'

class NumberTwoDialog extends React.Component {

  render() {
    return(
      <CloseStackContext.Consumer>
        {close => (
          <NavigateStackContext.Consumer>
            {({ navigate }) => (
              <div className='DialogNumber2 Dialog'>
                <div>
                  <h1>I am Dialog Number 2</h1>
                  <button onClick={()=>navigate('back')}>
                    Back
                  </button>
                  <button onClick={()=>navigate('NumberThree')}>
                    Next
                  </button>
                  <button onClick={()=>close()}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </NavigateStackContext.Consumer>
        )}
      </CloseStackContext.Consumer>
    )
  }
}

export default NumberTwoDialog
