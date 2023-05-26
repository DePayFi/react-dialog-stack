import { CloseStackContext } from '../../src'
import { NavigateStackContext } from '../../src'
import React from 'react'

class NewDialog extends React.Component {

  render() {
    return(
      <CloseStackContext.Consumer>
        {close => (
          <NavigateStackContext.Consumer>
            {({ navigate }) => (
              <div className='NewDialog Dialog'>
                <div>
                  <h1>I am an entirely new Dialog</h1>
                </div>
              </div>
            )}
          </NavigateStackContext.Consumer>
        )}
      </CloseStackContext.Consumer>
    )
  }
}

export default NewDialog
