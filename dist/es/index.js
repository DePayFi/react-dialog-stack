
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import React from 'react';
import { ReactDialog } from 'depay-react-dialog';

var NavigationContext = React.createContext();

const _jsxFileName = "/Users/sebastian/Work/DePay/depay-react-dialog-stack/src/index.jsx";
class ReactDialogStack extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      stack: [props.start],
      animating: false,
      animation: null,
      direction: 'forward',
      animationSpeed: 200,
      open: true
    };
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
        React.createElement('div', { key: index, className: ['StackedDialog'].concat(stackState).join(' '), __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}
          , React.createElement('div', { className: "StackedDialogRow", __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}
            , React.createElement('div', { className: "StackedDialogCell", onClick: (event)=> this.onClickBackground(event, closeContainer), __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}
              , React.createElement(NavigationContext.Provider, { value: this.navigate.bind(this), __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}
                ,  this.props.dialogs[route] 
              )
            )
          )
        )
      )
    }.bind(this));
  }

  render() {
    return(
      React.createElement(ReactDialog, { close: this.close, open: this.state.open, __self: this, __source: {fileName: _jsxFileName, lineNumber: 104}}
        ,  this.renderStack() 
      )
    )
  }
}

export { ReactDialogStack };
