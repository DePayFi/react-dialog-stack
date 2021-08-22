import React from 'react'
import { ReactDialogStack } from '../../src'
import NumberOneDialog from '../dialogs/NumberOneDialog'
import NumberTwoDialog from '../dialogs/NumberTwoDialog'
import NumberThreeDialog from '../dialogs/NumberThreeDialog'
import NewDialog from '../dialogs/NewDialog'

class DemoStack extends React.Component {

  render() {
    return(
      <ReactDialogStack
        document={ this.props.document }
        start='NumberOne'
        open={this.props.open}
        close={this.props.close}
        background={this.props.background}
        dialogs={{
          NumberOne: <NumberOneDialog/>,
          NumberTwo: <NumberTwoDialog/>,
          NumberThree: <NumberThreeDialog/>,
          New: <NewDialog/>
        }}
      />
    )
  }
}

export { DemoStack }
