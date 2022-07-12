(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('@depay/react-dialog')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', '@depay/react-dialog'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactDialogStack = {}, global.React, global.ReactDialog));
}(this, (function (exports, React, reactDialog) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  var CloseStackContext = React__default['default'].createContext();

  var NavigateStackContext = React__default['default'].createContext();

  function ReactDialogStackStyle () {
    return `

    .ReactDialogStack {
      align-items: center;
      bottom: 0;
      display: flex;
      flex: 1;
      height: 100%;
      justify-content: center;
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

  var StackContext = React__default['default'].createContext();

  const _jsxFileName = "/Users/sebastian/Work/DePay/react-dialog-stack/src/index.jsx";
  class ReactDialogStack extends React__default['default'].Component {
    constructor(props) {
      super(props);

      if (props.setNavigator) {
        props.setNavigator(this);
      }

      this.state = {
        stack: [props.start],
        animating: false,
        animation: null,
        direction: 'forward',
        animationSpeed: 200,
      };
    }

    set(stack) {
      this.setState({ stack });
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
            React__default['default'].createElement('div', {
              key: index,
              className: ['ReactDialogStack'].concat(stackState).join(' '),
              onClick: this.onClick.bind(this), __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}}
            
              , React__default['default'].createElement(NavigateStackContext.Provider, {
                value: { navigate: this.navigate.bind(this), set: this.set.bind(this) }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}}
              
                , React__default['default'].createElement(CloseStackContext.Provider, { value: this.close.bind(this), __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}
                  , React__default['default'].createElement(StackContext.Provider, { value: this.state.stack, __self: this, __source: {fileName: _jsxFileName, lineNumber: 139}}
                    , React__default['default'].createElement('div', { className: "ReactDialogAnimation", __self: this, __source: {fileName: _jsxFileName, lineNumber: 140}}, this.props.dialogs[route])
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
        event.target.className.match &&
        event.target.className.match('ReactDialogStack') // clicked background
      ) {
        if (this.state.stack.length > 1) {
          this.unstack();
        } else {
          this.close();
        }
      }
    }

    close() {
      if (this.state.stack.length > 1) {
        this.unstack();
      } else {
        this.setState({ stack: this.state.stack.slice(0, 1) });
        this.props.close();
      }
    }

    render() {
      return (
        React__default['default'].createElement(reactDialog.ReactDialog, {
          close: this.close.bind(this),
          open: this.props.open,
          document: this.props.document,
          container: this.props.container,
          background: this.props.background, __self: this, __source: {fileName: _jsxFileName, lineNumber: 176}}
        
          , React__default['default'].createElement('style', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 183}}, ReactDialogStackStyle())
          , this.renderStack()
        )
      )
    }
  }

  exports.CloseStackContext = CloseStackContext;
  exports.NavigateStackContext = NavigateStackContext;
  exports.ReactDialogStack = ReactDialogStack;
  exports.StackContext = StackContext;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
