import React from 'react';
import { ReactDialog } from 'depay-react-dialog';

var CloseStackContext = React.createContext();

var NavigateStackContext = React.createContext();

function ReactDialogStackStyle () {
  return `

    .ReactDialogStack {
      bottom: 0;
      display: table;
      height: 100%;
      position: absolute;
      top: 0;
      transition: left 0.1s ease, opacity 0.2s ease;
      width: 100%;
    }

    .ReactDialogStackRow {
      display: table-row;
    }

    .ReactDialogStackCell {
      display: table-cell;
      vertical-align: middle;
      padding: 0 0.6rem;
    }

    .ReactDialogStack {
      left: 0;
      opacity: 1;
    }

    .ReactDialogStack.inactive {
      display: none;
    }

    .ReactDialogStack.animating.stale {
      display: none;
    }

    .ReactDialogStack.animating.previous.forward {
      opacity: 0;
      left: -5rem;
    }

    .ReactDialogStack.animating.previous.backward {
      opacity: 0;
      left: 5rem;
    }

    .ReactDialogStack.animating.next.forward {
      opacity: 0;
      left: 5rem;
    }

    .ReactDialogStack.animating.next.backward {
      opacity: 0;
      left: -5rem;
    }
  `
}

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
    };
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
          });
        }.bind(this),
        this.state.animationSpeed,
      ),
    });
  }

  unstack() {
    if (this.state.stack.length <= 1) {
      return
    }

    let newStack = [...this.state.stack];
    newStack.pop();

    this.setState({
      animating: true,
      direction: 'backward',
      animation: setTimeout(
        function () {
          this.setState({
            stack: newStack,
            animating: false,
          });
        }.bind(this),
        this.state.animationSpeed,
      ),
    });
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
        ];
        return (
          React.createElement('div', { key: index, className: ['ReactDialogStack'].concat(stackState).join(' '), __self: this, __source: {fileName: _jsxFileName, lineNumber: 122}}
            , React.createElement('div', { className: "ReactDialogStackRow", __self: this, __source: {fileName: _jsxFileName, lineNumber: 123}}
              , React.createElement('div', { className: "ReactDialogStackCell", onClick: this.onClick.bind(this), __self: this, __source: {fileName: _jsxFileName, lineNumber: 124}}
                , React.createElement(NavigateStackContext.Provider, { value: this.navigate.bind(this), __self: this, __source: {fileName: _jsxFileName, lineNumber: 125}}
                  , React.createElement(CloseStackContext.Provider, { value: this.close.bind(this), __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}}
                    , React.createElement('div', { className: "ReactDialogAnimation", __self: this, __source: {fileName: _jsxFileName, lineNumber: 127}}, this.props.dialogs[route])
                  )
                )
              )
            )
          )
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
        this.unstack();
      } else {
        this.close();
      }
    }
  }

  close() {
    this.setState({ stack: this.state.stack.slice(0, 1) });
    this.props.close();
  }

  render() {
    return (
      React.createElement(ReactDialog, {
        close: this.close.bind(this),
        open: this.props.open,
        document: this.props.document, __self: this, __source: {fileName: _jsxFileName, lineNumber: 159}}
      
        , React.createElement('style', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 164}}, ReactDialogStackStyle())
        , this.renderStack()
      )
    )
  }
}

export { CloseStackContext, NavigateStackContext, ReactDialogStack };
