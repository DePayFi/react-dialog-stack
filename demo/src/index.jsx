import React from 'react'
import { ReactDialogStack } from '../../src'
import NumberOneDialog from '../dialogs/NumberOneDialog'

class DemoStack extends React.Component {

  render() {
    return(
      <ReactDialogStack
        document={ this.props.document }
        start='NumberOne'
        dialogs={{
          NumberOne: <NumberOneDialog/>
        }}        
      />
    )
  }
}

export { DemoStack }
