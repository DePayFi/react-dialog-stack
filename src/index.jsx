import NavigationContext from './contexts/NavigationContext'
import React from 'react'
import ReactDOM from 'react-dom'
import { ReactDialog } from "depay-react-dialog"

class ReactDialogStack extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      stack: [props.start],
      animating: false,
      animation: null,
      direction: 'forward',
      animationSpeed: 200,
      open: true
    }
  }

  navigate(route) {
    if(this.state.stack.indexOf(route) > -1) { return }
    if(route === 'back') { return this.unstack() }

    this.setState({
      stack: this.state.stack.concat(route),
      animating: true,
      direction: 'forward',
      animation: setTimeout(function(){
        this.setState({
          animating: false
        });
      }.bind(this), this.state.animationSpeed)
    });
  }

  classForState(index){
    if(this.state.animating) { return }
    if(this.state.stack.length === 1) {
      return 'active';
    } else {
      if(this.state.stack.length === index+1) {
        return 'active';
      } else {
        return 'inactive';
      }
    }
  }

  classForPosition(index) {
    if(this.state.stack.length > 1) {
      if(this.state.stack.length === index+1) {
        if(this.state.direction === 'forward') {
          return 'next';
        } else {
          return 'previous';
        }
      } else if (this.state.stack.length-1 === index+1) {
        if(this.state.direction === 'forward') {
          return 'previous';
        } else {
          return 'next';
        }
      } else {
        return 'stale';
      }
    }
  }

  classForAnimation() {
    if(this.state.animating) {
      return 'animating';
    }
  }

  classForDirection() {
    return this.state.direction;
  }

  renderStack() {
    return this.state.stack.map(function(route, index){
      let stackState = [
        this.classForState(index),
        this.classForPosition(index),
        this.classForAnimation(),
        this.classForDirection()
      ];
      return(
        <div key={index} className={['StackedDialog'].concat(stackState).join(' ')}>
          <div className='StackedDialogRow'>
            <div className='StackedDialogCell' onClick={(event)=> this.onClickBackground(event, closeContainer)}>
              <NavigationContext.Provider value={this.navigate.bind(this)}>
                { this.props.dialogs[route] }
              </NavigationContext.Provider>
            </div>
          </div>
        </div>
      )
    }.bind(this));
  }

  render() {
    return(
      <ReactDialog close={this.close} open={this.state.open} document={this.props.document}>
        { this.renderStack() }
      </ReactDialog>
    )
  }
}

export { ReactDialogStack }
