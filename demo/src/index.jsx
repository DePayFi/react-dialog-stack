import React from 'react'
import { ReactDialogStack } from '../../src'
import NumberOneDialog from '../dialogs/NumberOneDialog'
import NumberTwoDialog from '../dialogs/NumberTwoDialog'
import NumberThreeDialog from '../dialogs/NumberThreeDialog'

class DemoStack extends React.Component {

  render() {
    return(
      <ReactDialogStack
        document={ this.props.document }
        start='NumberOne'
        open={this.props.open}
        close={this.props.close}
        dialogs={{
          NumberOne: <NumberOneDialog/>,
          NumberTwo: <NumberTwoDialog/>,
          NumberThree: <NumberThreeDialog/>
        }}
      />
    )
  }
}

export { DemoStack }
