import { CloseStackContext } from '../../src'
import { NavigateStackContext } from '../../src'
import React from 'react'

class NewStackDialog extends React.Component {

  render() {
    return(
      <CloseStackContext.Consumer>
        {close => (
          <NavigateStackContext.Consumer>
            {({ navigate, hide }) => (
              <div className='NewStackDialog Dialog'>
                <div>
                  <div>
                    <h1>I am an entirely new STACK</h1>
                  </div>
                  <div>
                    <button onClick={()=>{
                      hide('backward')
                      setTimeout(()=>window.updateStack(true, 'backward'), 100)
                    }}>
                      Back to previous stack
                    </button>
                  </div>
                </div>
              </div>
            )}
          </NavigateStackContext.Consumer>
        )}
      </CloseStackContext.Consumer>
    )
  }
}

export default NewStackDialog
