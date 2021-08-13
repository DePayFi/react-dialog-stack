(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('depay-react-dialog')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'depay-react-dialog'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.DemoStack = {}, global.React, global.ReactDialog));
}(this, (function (exports, React, depayReactDialog) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  var CloseStackContext = React__default['default'].createContext();

  var NavigateStackContext = React__default['default'].createContext();

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

  var StackContext = React__default['default'].createContext();

  const _jsxFileName = "/Users/sebastian/Work/DePay/depay-react-dialog-stack/src/index.jsx";
  class ReactDialogStack extends React__default['default'].Component {
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
            React__default['default'].createElement('div', { key: index, className: ['ReactDialogStack'].concat(stackState).join(' '), __self: this, __source: {fileName: _jsxFileName, lineNumber: 123}}
              , React__default['default'].createElement('div', { className: "ReactDialogStackRow", __self: this, __source: {fileName: _jsxFileName, lineNumber: 124}}
                , React__default['default'].createElement('div', { className: "ReactDialogStackCell", onClick: this.onClick.bind(this), __self: this, __source: {fileName: _jsxFileName, lineNumber: 125}}
                  , React__default['default'].createElement(NavigateStackContext.Provider, { value: this.navigate.bind(this), __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}}
                    , React__default['default'].createElement(CloseStackContext.Provider, { value: this.close.bind(this), __self: this, __source: {fileName: _jsxFileName, lineNumber: 127}}
                      , React__default['default'].createElement(StackContext.Provider, { value: this.state.stack, __self: this, __source: {fileName: _jsxFileName, lineNumber: 128}}
                        , React__default['default'].createElement('div', { className: "ReactDialogAnimation", __self: this, __source: {fileName: _jsxFileName, lineNumber: 129}}, this.props.dialogs[route])
                      )
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
        event.target.className.match &&
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
      if (this.state.stack.length > 1) {
        this.unstack();
      } else {
        this.setState({ stack: this.state.stack.slice(0, 1) });
        this.props.close();
      }
    }

    render() {
      return (
        React__default['default'].createElement(depayReactDialog.ReactDialog, {
          close: this.close.bind(this),
          open: this.props.open,
          document: this.props.document,
          container: this.props.container,
          background: this.props.background, __self: this, __source: {fileName: _jsxFileName, lineNumber: 167}}
        
          , React__default['default'].createElement('style', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 174}}, ReactDialogStackStyle())
          , this.renderStack()
        )
      )
    }
  }

  const _jsxFileName$1 = "/Users/sebastian/Work/DePay/depay-react-dialog-stack/demo/dialogs/NumberOneDialog.jsx";
  class NumberOneDialog extends React__default['default'].Component {

    render() {
      return(
        React__default['default'].createElement(NavigateStackContext.Consumer, {__self: this, __source: {fileName: _jsxFileName$1, lineNumber: 9}}
          , navigate => (
            React__default['default'].createElement(CloseStackContext.Consumer, {__self: this, __source: {fileName: _jsxFileName$1, lineNumber: 11}}
              , close => (
                React__default['default'].createElement('div', { className: "DialogNumber1", __self: this, __source: {fileName: _jsxFileName$1, lineNumber: 13}}
                  , React__default['default'].createElement('h1', {__self: this, __source: {fileName: _jsxFileName$1, lineNumber: 14}}, "I am Dialog Number 1"    )
                  , React__default['default'].createElement('button', { onClick: close, __self: this, __source: {fileName: _jsxFileName$1, lineNumber: 15}}, "Close"

                  )
                  , React__default['default'].createElement('button', { onClick: ()=>navigate('NumberTwo'), __self: this, __source: {fileName: _jsxFileName$1, lineNumber: 18}}, "Next"

                  )
                )
              )
            )
          )
        )
      )
    }
  }

  const _jsxFileName$2 = "/Users/sebastian/Work/DePay/depay-react-dialog-stack/demo/dialogs/NumberTwoDialog.jsx";

  class NumberTwoDialog extends React__default['default'].Component {

    render() {
      return(
        React__default['default'].createElement(NavigateStackContext.Consumer, {__self: this, __source: {fileName: _jsxFileName$2, lineNumber: 9}}
          , navigate => (
            React__default['default'].createElement('div', { className: "DialogNumber2", __self: this, __source: {fileName: _jsxFileName$2, lineNumber: 11}}
              , React__default['default'].createElement('h1', {__self: this, __source: {fileName: _jsxFileName$2, lineNumber: 12}}, "I am Dialog Number 2"    )
              , React__default['default'].createElement('button', { onClick: ()=>navigate('back'), __self: this, __source: {fileName: _jsxFileName$2, lineNumber: 13}}, "Back"

              )
              , React__default['default'].createElement('button', { onClick: ()=>navigate('NumberThree'), __self: this, __source: {fileName: _jsxFileName$2, lineNumber: 16}}, "Next"

              )
            )
          )
        )
      )
    }
  }

  const _jsxFileName$3 = "/Users/sebastian/Work/DePay/depay-react-dialog-stack/demo/dialogs/NumberThreeDialog.jsx";
  class NumberThreeDialog extends React__default['default'].Component {

    render() {
      return(
        React__default['default'].createElement(CloseStackContext.Consumer, {__self: this, __source: {fileName: _jsxFileName$3, lineNumber: 9}}
          , close => (
            React__default['default'].createElement(NavigateStackContext.Consumer, {__self: this, __source: {fileName: _jsxFileName$3, lineNumber: 11}}
              , navigate => (
                React__default['default'].createElement('div', { className: "DialogNumber3", __self: this, __source: {fileName: _jsxFileName$3, lineNumber: 13}}
                  , React__default['default'].createElement('h1', {__self: this, __source: {fileName: _jsxFileName$3, lineNumber: 14}}, "I am Dialog Number 3"    )
                  , React__default['default'].createElement('button', { onClick: ()=>navigate('back'), __self: this, __source: {fileName: _jsxFileName$3, lineNumber: 15}}, "Back"

                  )
                  , React__default['default'].createElement('button', { onClick: close, __self: this, __source: {fileName: _jsxFileName$3, lineNumber: 18}}, "Close"

                  )
                )
              )
            )
          )
        )
      )
    }
  }

  const _jsxFileName$4 = "/Users/sebastian/Work/DePay/depay-react-dialog-stack/demo/src/index.jsx";
  class DemoStack extends React__default['default'].Component {

    render() {
      return(
        React__default['default'].createElement(ReactDialogStack, {
          document:  this.props.document ,
          start: "NumberOne",
          open: this.props.open,
          close: this.props.close,
          background: this.props.background,
          dialogs: {
            NumberOne: React__default['default'].createElement(NumberOneDialog, {__self: this, __source: {fileName: _jsxFileName$4, lineNumber: 18}}),
            NumberTwo: React__default['default'].createElement(NumberTwoDialog, {__self: this, __source: {fileName: _jsxFileName$4, lineNumber: 19}}),
            NumberThree: React__default['default'].createElement(NumberThreeDialog, {__self: this, __source: {fileName: _jsxFileName$4, lineNumber: 20}})
          }, __self: this, __source: {fileName: _jsxFileName$4, lineNumber: 11}}
        )
      )
    }
  }

  exports.DemoStack = DemoStack;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
