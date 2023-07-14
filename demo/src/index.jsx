import React from 'react'
import { ReactDialogStack } from '../../src'
import NumberOneDialog from '../dialogs/NumberOneDialog'
import NumberTwoDialog from '../dialogs/NumberTwoDialog'
import NumberThreeDialog from '../dialogs/NumberThreeDialog'
import NewDialog from '../dialogs/NewDialog'
import NewStackDialog from '../dialogs/NewStackDialog'

class DemoStack extends React.Component {

  render() {
    return(
      <ReactDialogStack
        document={ this.props.document }
        start='NumberOne'
        open={this.props.open}
        close={this.props.close}
        setNavigator={this.props.setNavigator}
        background={this.props.background}
        stacked={this.props.stacked}
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

class DemoStack2 extends React.Component {

  render() {
    return(
      <ReactDialogStack
        document={ this.props.document }
        start='NewStack'
        open={this.props.open}
        close={this.props.close}
        setNavigator={this.props.setNavigator}
        background={this.props.background}
        stacked={this.props.stacked}
        dialogs={{
          NewStack: <NewStackDialog/>,
        }}
      />
    )
  }
}

export { DemoStack, DemoStack2 }
