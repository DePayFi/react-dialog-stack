import { CloseStackContext } from '../../src'
import { NavigateStackContext } from '../../src'
import React from 'react'

class NumberThreeDialog extends React.Component {

  render() {
    return(
      <CloseStackContext.Consumer>
        {close => (
          <NavigateStackContext.Consumer>
            {({ navigate }) => (
              <div className='DialogNumber3 Dialog'>
                <div>
                  <h1>I am Dialog Number 3</h1>
                  <button onClick={()=>navigate('back')}>
                    Back
                  </button>
                  <button onClick={()=>close(true)}>
                    Close (force)
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

export default NumberThreeDialog
