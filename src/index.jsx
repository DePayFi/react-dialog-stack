import CloseStackContext from './contexts/CloseStackContext'
import NavigateStackContext from './contexts/NavigateStackContext'
import React from 'react'
import ReactDialogStackStyle from './styles/ReactDialogStackStyle'
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
        <div key={index} className={['ReactDialogStack'].concat(stackState).join(' ')}>
          <div className='ReactDialogStackRow'>
            <div className='ReactDialogStackCell' onClick={(event)=> this.onClick(event, close)}>
              <NavigateStackContext.Provider value={this.navigate.bind(this)}>
                <CloseStackContext.Provider value={this.close.bind(this)}>
                  { this.props.dialogs[route] }
                </CloseStackContext.Provider>
              </NavigateStackContext.Provider>
            </div>
          </div>
        </div>
      )
    }.bind(this));
  }

  onClick(event, closeContainer) {
    console.log('CLICK', event);
    if(
      event.target instanceof HTMLElement &&
      event.target.className.match('ReactDialogStackCell')
    ) {
      console.log('CLICK ReactDialogStackCell');
      // if stack background clicked
      if(this.state.stack.length > 1) {
        this.unstack();
      } else {
        closeContainer();
      }
      this.close();
    }
  }

  close() {
    this.props.close()
  }

  render() {
    return(
      <ReactDialog close={this.close.bind(this)} open={this.props.open} document={this.props.document}>
        <style>{ReactDialogStackStyle()}</style>
        { this.renderStack() }
      </ReactDialog>
    )
  }
}

export {
  ReactDialogStack,
  CloseStackContext,
  NavigateStackContext
}
