import CloseStackContext from './contexts/CloseStackContext'
import NavigateStackContext from './contexts/NavigateStackContext'
import React from 'react'
import ReactDialogStackStyle from './styles/ReactDialogStackStyle'
import StackContext from './contexts/StackContext'
import { ReactDialog } from '@depay/react-dialog'

class ReactDialogStack extends React.Component {
  constructor(props) {
    super(props)

    if (props.setNavigator) {
      props.setNavigator(this)
    }

    if (props.stacked) {
      const direction = typeof props.stacked === 'string' ? props.stacked : 'forward'
      this.state = {
        stack: [],
        animating: false,
        animation: null,
        direction,
        animationSpeed: 200,
      }
      setTimeout(() => this.navigate(props.start, direction), 10)
    } else {
      this.state = {
        stack: [props.start],
        animating: false,
        animation: null,
        direction: 'forward',
        animationSpeed: 200,
      }
    }
  }

  set(stack) {
    this.setState({ stack })
  }

  hide(direction = 'forward') {
    if (direction === 'backward') {
      this.setState({ stack: [null, ...this.state.stack] })
      setTimeout(() => this.navigate('back'), 10)
    } else {
      this.navigate(null)
    }
  }

  navigate(route, direction = 'forward') {
    if (this.state.stack.indexOf(route) > -1) {
      return
    }
    if (route === 'back') {
      return this.unstack()
    }

    this.setState({
      stack: this.state.stack.concat(route),
      animating: true,
      direction,
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
    } else if (this.state.animating && this.props.stacked && index === 0) {
      return 'next'
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
          <div
            key={index}
            className={['ReactDialogStack'].concat(stackState).join(' ')}
            onClick={this.onClick.bind(this)}
          >
            <NavigateStackContext.Provider
              value={{
                navigate: this.navigate.bind(this),
                set: this.set.bind(this),
                hide: this.hide.bind(this),
              }}
            >
              <CloseStackContext.Provider value={this.close.bind(this)}>
                <StackContext.Provider value={this.state.stack}>
                  <div className="ReactDialogAnimation">{this.props.dialogs[route]}</div>
                </StackContext.Provider>
              </CloseStackContext.Provider>
            </NavigateStackContext.Provider>
          </div>
        )
      }.bind(this),
    )
  }

  onClick(event) {
    if (
      event.target &&
      event.target.className &&
      event.target.className.match &&
      event.target.className.match('ReactDialogStack') // clicked background
    ) {
      if (this.state.stack.length > 1) {
        this.unstack()
      } else {
        this.close()
      }
    }
  }

  close(force) {
    if (this.state.stack.length > 1 && !force) {
      this.unstack()
    } else {
      this.props.close()
      setTimeout(() => this.setState({ stack: this.state.stack.slice(0, 1) }), 400)
    }
  }

  render() {
    return (
      <ReactDialog
        close={this.close.bind(this)}
        open={this.props.open}
        document={this.props.document}
        container={this.props.container}
        animate={this.props.stacked ? false : true}
        background={this.props.background}
      >
        <style>{ReactDialogStackStyle()}</style>
        {this.renderStack()}
      </ReactDialog>
    )
  }
}

export { ReactDialogStack, CloseStackContext, NavigateStackContext, StackContext }
