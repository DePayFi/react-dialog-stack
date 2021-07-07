import CloseStackContext from './contexts/CloseStackContext'
import NavigateStackContext from './contexts/NavigateStackContext'
import React from 'react'
import ReactDialogStackStyle from './styles/ReactDialogStackStyle'
import ReactDOM from 'react-dom'
import { ReactDialog } from 'depay-react-dialog'

class ReactDialogStack extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      stack: [props.start],
      animating: false,
      animation: null,
      direction: 'forward',
      animationSpeed: 200,
    }
  }

  navigate(route) {
    if (this.state.stack.indexOf(route) > -1) {
      return
    }
    if (route === 'back') {
      return this.unstack()
    }

    this.setState({
      stack: this.state.stack.concat(route),
      animating: true,
      direction: 'forward',
      animation: setTimeout(
        function () {
          this.setState({
            animating: false,
          })
        }.bind(this),
        this.state.animationSpeed,
      ),
    })
  }

  unstack() {
    if (this.state.stack.length <= 1) {
      return
    }

    let newStack = [...this.state.stack]
    newStack.pop()

    this.setState({
      animating: true,
      direction: 'backward',
      animation: setTimeout(
        function () {
          this.setState({
            stack: newStack,
            animating: false,
          })
        }.bind(this),
        this.state.animationSpeed,
      ),
    })
  }

  classForState(index) {
    if (this.state.animating) {
      return
    }
    if (this.state.stack.length === 1) {
      return 'active'
    } else {
      if (this.state.stack.length === index + 1) {
        return 'active'
      } else {
        return 'inactive'
      }
    }
  }

  classForPosition(index) {
    if (this.state.stack.length > 1) {
      if (this.state.stack.length === index + 1) {
        if (this.state.direction === 'forward') {
          return 'next'
        } else {
          return 'previous'
        }
      } else if (this.state.stack.length - 1 === index + 1) {
        if (this.state.direction === 'forward') {
          return 'previous'
        } else {
          return 'next'
        }
      } else {
        return 'stale'
      }
    }
  }

  classForAnimation() {
    if (this.state.animating) {
      return 'animating'
    }
  }

  classForDirection() {
    return this.state.direction
  }

  renderStack() {
    return this.state.stack.map(
      function (route, index) {
        let stackState = [
          this.classForState(index),
          this.classForPosition(index),
          this.classForAnimation(),
          this.classForDirection(),
        ]
        return (
          <div key={index} className={['ReactDialogStack'].concat(stackState).join(' ')}>
            <div className="ReactDialogStackRow">
              <div className="ReactDialogStackCell" onClick={this.onClick.bind(this)}>
                <NavigateStackContext.Provider value={this.navigate.bind(this)}>
                  <CloseStackContext.Provider value={this.close.bind(this)}>
                    <div className="ReactDialogAnimation">{this.props.dialogs[route]}</div>
                  </CloseStackContext.Provider>
                </NavigateStackContext.Provider>
              </div>
            </div>
          </div>
        )
      }.bind(this),
    )
  }

  onClick(event) {
    if (
      event.target &&
      event.target.className &&
      event.target.className.match('ReactDialogStackCell') // clicked background
    ) {
      if (this.state.stack.length > 1) {
        this.unstack()
      } else {
        this.close()
      }
    }
  }

  close() {
    this.setState({ stack: this.state.stack.slice(0, 1) })
    this.props.close()
  }

  render() {
    return (
      <ReactDialog
        close={this.close.bind(this)}
        open={this.props.open}
        document={this.props.document}
        container={this.props.container}
        background={this.props.background}
      >
        <style>{ReactDialogStackStyle()}</style>
        {this.renderStack()}
      </ReactDialog>
    )
  }
}

export { ReactDialogStack, CloseStackContext, NavigateStackContext }
