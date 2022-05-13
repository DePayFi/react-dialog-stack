(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('@depay/react-dialog')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', '@depay/react-dialog'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.DemoStack = {}, global.React, global.ReactDialog));
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

      if (props.setNavigate) {
        props.setNavigate(this.navigate.bind(this));
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

  const _jsxFileName$1 = "/Users/sebastian/Work/DePay/react-dialog-stack/demo/dialogs/NumberOneDialog.jsx";
  class NumberOneDialog extends React__default['default'].Component {

    render() {
      return(
        React__default['default'].createElement(NavigateStackContext.Consumer, {__self: this, __source: {fileName: _jsxFileName$1, lineNumber: 9}}
          , ({ navigate, set }) => (
            React__default['default'].createElement(CloseStackContext.Consumer, {__self: this, __source: {fileName: _jsxFileName$1, lineNumber: 11}}
              , close => (
                React__default['default'].createElement('div', { className: "DialogNumber1", __self: this, __source: {fileName: _jsxFileName$1, lineNumber: 13}}
                  , React__default['default'].createElement('h1', {__self: this, __source: {fileName: _jsxFileName$1, lineNumber: 14}}, "I am Dialog Number 1"    )
                  , React__default['default'].createElement('button', { onClick: close, __self: this, __source: {fileName: _jsxFileName$1, lineNumber: 15}}, "Close"

                  )
                  , React__default['default'].createElement('button', { onClick: ()=>navigate('NumberTwo'), __self: this, __source: {fileName: _jsxFileName$1, lineNumber: 18}}, "Next"

                  )
                  , React__default['default'].createElement('button', { onClick: ()=>set(['New']), __self: this, __source: {fileName: _jsxFileName$1, lineNumber: 21}}, "Set"

                  )
                )
              )
            )
          )
        )
      )
    }
  }

  const _jsxFileName$2 = "/Users/sebastian/Work/DePay/react-dialog-stack/demo/dialogs/NumberTwoDialog.jsx";
  class NumberTwoDialog extends React__default['default'].Component {

    render() {
      return(
        React__default['default'].createElement(NavigateStackContext.Consumer, {__self: this, __source: {fileName: _jsxFileName$2, lineNumber: 9}}
          , ({ navigate }) => (
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

  const _jsxFileName$3 = "/Users/sebastian/Work/DePay/react-dialog-stack/demo/dialogs/NumberThreeDialog.jsx";
  class NumberThreeDialog extends React__default['default'].Component {

    render() {
      return(
        React__default['default'].createElement(CloseStackContext.Consumer, {__self: this, __source: {fileName: _jsxFileName$3, lineNumber: 9}}
          , close => (
            React__default['default'].createElement(NavigateStackContext.Consumer, {__self: this, __source: {fileName: _jsxFileName$3, lineNumber: 11}}
              , ({ navigate }) => (
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

  const _jsxFileName$4 = "/Users/sebastian/Work/DePay/react-dialog-stack/demo/dialogs/NewDialog.jsx";
  class NewDialog extends React__default['default'].Component {

    render() {
      return(
        React__default['default'].createElement(CloseStackContext.Consumer, {__self: this, __source: {fileName: _jsxFileName$4, lineNumber: 9}}
          , close => (
            React__default['default'].createElement(NavigateStackContext.Consumer, {__self: this, __source: {fileName: _jsxFileName$4, lineNumber: 11}}
              , ({ navigate }) => (
                React__default['default'].createElement('div', { className: "NewDialog", __self: this, __source: {fileName: _jsxFileName$4, lineNumber: 13}}
                  , React__default['default'].createElement('h1', {__self: this, __source: {fileName: _jsxFileName$4, lineNumber: 14}}, "I am an entirely new Dialog"     )
                )
              )
            )
          )
        )
      )
    }
  }

  const _jsxFileName$5 = "/Users/sebastian/Work/DePay/react-dialog-stack/demo/src/index.jsx";
  class DemoStack extends React__default['default'].Component {

    render() {
      return(
        React__default['default'].createElement(ReactDialogStack, {
          document:  this.props.document ,
          start: "NumberOne",
          open: this.props.open,
          close: this.props.close,
          setNavigate: this.props.setNavigate,
          background: this.props.background,
          dialogs: {
            NumberOne: React__default['default'].createElement(NumberOneDialog, {__self: this, __source: {fileName: _jsxFileName$5, lineNumber: 20}}),
            NumberTwo: React__default['default'].createElement(NumberTwoDialog, {__self: this, __source: {fileName: _jsxFileName$5, lineNumber: 21}}),
            NumberThree: React__default['default'].createElement(NumberThreeDialog, {__self: this, __source: {fileName: _jsxFileName$5, lineNumber: 22}}),
            New: React__default['default'].createElement(NewDialog, {__self: this, __source: {fileName: _jsxFileName$5, lineNumber: 23}})
          }, __self: this, __source: {fileName: _jsxFileName$5, lineNumber: 12}}
        )
      )
    }
  }

  exports.DemoStack = DemoStack;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
