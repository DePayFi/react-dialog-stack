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

      if (props.setNavigator) {
        props.setNavigator(this);
      }

      if (props.stacked) {
        const direction = typeof props.stacked === 'string' ? props.stacked : 'forward';
        this.state = {
          stack: [],
          animating: false,
          animation: null,
          direction,
          animationSpeed: 200,
        };
        setTimeout(() => this.navigate(props.start, direction), 10);
      } else {
        this.state = {
          stack: [props.start],
          animating: false,
          animation: null,
          direction: 'forward',
          animationSpeed: 200,
        };
      }
    }

    set(stack) {
      this.setState({ stack });
    }

    hide(direction = 'forward') {
      if (direction === 'backward') {
        this.setState({ stack: [null, ...this.state.stack] });
        setTimeout(() => this.navigate('back'), 10);
      } else {
        this.navigate(null);
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
          ];
          return (
            React__default['default'].createElement('div', {
              key: index,
              className: ['ReactDialogStack'].concat(stackState).join(' '),
              onClick: this.onClick.bind(this), __self: this, __source: {fileName: _jsxFileName, lineNumber: 153}}
            
              , React__default['default'].createElement(NavigateStackContext.Provider, {
                value: {
                  navigate: this.navigate.bind(this),
                  set: this.set.bind(this),
                  hide: this.hide.bind(this),
                }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 158}}
              
                , React__default['default'].createElement(CloseStackContext.Provider, { value: this.close.bind(this), __self: this, __source: {fileName: _jsxFileName, lineNumber: 165}}
                  , React__default['default'].createElement(StackContext.Provider, { value: this.state.stack, __self: this, __source: {fileName: _jsxFileName, lineNumber: 166}}
                    , React__default['default'].createElement('div', { className: "ReactDialogAnimation", __self: this, __source: {fileName: _jsxFileName, lineNumber: 167}}, this.props.dialogs[route])
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

    close(force) {
      if (this.state.stack.length > 1 && !force) {
        this.unstack();
      } else {
        this.props.close();
        setTimeout(() => this.setState({ stack: this.state.stack.slice(0, 1) }), 400);
      }
    }

    render() {
      return (
        React__default['default'].createElement(reactDialog.ReactDialog, {
          close: this.close.bind(this),
          open: this.props.open,
          document: this.props.document,
          container: this.props.container,
          animate: this.props.stacked ? false : true,
          background: this.props.background, __self: this, __source: {fileName: _jsxFileName, lineNumber: 203}}
        
          , React__default['default'].createElement('style', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 211}}, ReactDialogStackStyle())
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
          , ({ navigate, set, hide }) => (
            React__default['default'].createElement(CloseStackContext.Consumer, {__self: this, __source: {fileName: _jsxFileName$1, lineNumber: 11}}
              , close => (
                React__default['default'].createElement('div', { className: "DialogNumber1 Dialog" , __self: this, __source: {fileName: _jsxFileName$1, lineNumber: 13}}
                  , React__default['default'].createElement('div', {__self: this, __source: {fileName: _jsxFileName$1, lineNumber: 14}}
                    , React__default['default'].createElement('h1', {__self: this, __source: {fileName: _jsxFileName$1, lineNumber: 15}}, "I am Dialog Number 1"    )
                    , React__default['default'].createElement('button', { onClick: close, __self: this, __source: {fileName: _jsxFileName$1, lineNumber: 16}}, "Close"

                    )
                    , React__default['default'].createElement('button', { onClick: ()=>navigate('NumberTwo'), __self: this, __source: {fileName: _jsxFileName$1, lineNumber: 19}}, "Next"

                    )
                    , React__default['default'].createElement('button', { onClick: ()=>set(['New']), __self: this, __source: {fileName: _jsxFileName$1, lineNumber: 22}}, "Set"

                    )
                    , React__default['default'].createElement('button', { onClick: ()=>{
                      hide('forward');
                      setTimeout(()=>window.updateAnotherStack(true, 'forward'), 100);
                    }, __self: this, __source: {fileName: _jsxFileName$1, lineNumber: 25}}, "Stack Stack"

                    )
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
        React__default['default'].createElement(CloseStackContext.Consumer, {__self: this, __source: {fileName: _jsxFileName$2, lineNumber: 9}}
          , close => (
            React__default['default'].createElement(NavigateStackContext.Consumer, {__self: this, __source: {fileName: _jsxFileName$2, lineNumber: 11}}
              , ({ navigate }) => (
                React__default['default'].createElement('div', { className: "DialogNumber2 Dialog" , __self: this, __source: {fileName: _jsxFileName$2, lineNumber: 13}}
                  , React__default['default'].createElement('div', {__self: this, __source: {fileName: _jsxFileName$2, lineNumber: 14}}
                    , React__default['default'].createElement('h1', {__self: this, __source: {fileName: _jsxFileName$2, lineNumber: 15}}, "I am Dialog Number 2"    )
                    , React__default['default'].createElement('button', { onClick: ()=>navigate('back'), __self: this, __source: {fileName: _jsxFileName$2, lineNumber: 16}}, "Back"

                    )
                    , React__default['default'].createElement('button', { onClick: ()=>navigate('NumberThree'), __self: this, __source: {fileName: _jsxFileName$2, lineNumber: 19}}, "Next"

                    )
                    , React__default['default'].createElement('button', { onClick: ()=>close(), __self: this, __source: {fileName: _jsxFileName$2, lineNumber: 22}}, "Close"

                    )
                  )
                )
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
                React__default['default'].createElement('div', { className: "DialogNumber3 Dialog" , __self: this, __source: {fileName: _jsxFileName$3, lineNumber: 13}}
                  , React__default['default'].createElement('div', {__self: this, __source: {fileName: _jsxFileName$3, lineNumber: 14}}
                    , React__default['default'].createElement('h1', {__self: this, __source: {fileName: _jsxFileName$3, lineNumber: 15}}, "I am Dialog Number 3"    )
                    , React__default['default'].createElement('button', { onClick: ()=>navigate('back'), __self: this, __source: {fileName: _jsxFileName$3, lineNumber: 16}}, "Back"

                    )
                    , React__default['default'].createElement('button', { onClick: ()=>close(true), __self: this, __source: {fileName: _jsxFileName$3, lineNumber: 19}}, "Close (force)"

                    )
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
                React__default['default'].createElement('div', { className: "NewDialog Dialog" , __self: this, __source: {fileName: _jsxFileName$4, lineNumber: 13}}
                  , React__default['default'].createElement('div', {__self: this, __source: {fileName: _jsxFileName$4, lineNumber: 14}}
                    , React__default['default'].createElement('h1', {__self: this, __source: {fileName: _jsxFileName$4, lineNumber: 15}}, "I am an entirely new Dialog"     )
                  )
                )
              )
            )
          )
        )
      )
    }
  }

  const _jsxFileName$5 = "/Users/sebastian/Work/DePay/react-dialog-stack/demo/dialogs/NewStackDialog.jsx";
  class NewStackDialog extends React__default['default'].Component {

    render() {
      return(
        React__default['default'].createElement(CloseStackContext.Consumer, {__self: this, __source: {fileName: _jsxFileName$5, lineNumber: 9}}
          , close => (
            React__default['default'].createElement(NavigateStackContext.Consumer, {__self: this, __source: {fileName: _jsxFileName$5, lineNumber: 11}}
              , ({ navigate, hide }) => (
                React__default['default'].createElement('div', { className: "NewStackDialog Dialog" , __self: this, __source: {fileName: _jsxFileName$5, lineNumber: 13}}
                  , React__default['default'].createElement('div', {__self: this, __source: {fileName: _jsxFileName$5, lineNumber: 14}}
                    , React__default['default'].createElement('div', {__self: this, __source: {fileName: _jsxFileName$5, lineNumber: 15}}
                      , React__default['default'].createElement('h1', {__self: this, __source: {fileName: _jsxFileName$5, lineNumber: 16}}, "I am an entirely new STACK"     )
                    )
                    , React__default['default'].createElement('div', {__self: this, __source: {fileName: _jsxFileName$5, lineNumber: 18}}
                      , React__default['default'].createElement('button', { onClick: ()=>{
                        hide('backward');
                        setTimeout(()=>window.updateStack(true, 'backward'), 100);
                      }, __self: this, __source: {fileName: _jsxFileName$5, lineNumber: 19}}, "Back to previous stack"

                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    }
  }

  const _jsxFileName$6 = "/Users/sebastian/Work/DePay/react-dialog-stack/demo/src/index.jsx";
  class DemoStack extends React__default['default'].Component {

    render() {
      return(
        React__default['default'].createElement(ReactDialogStack, {
          document:  this.props.document ,
          start: "NumberOne",
          open: this.props.open,
          close: this.props.close,
          setNavigator: this.props.setNavigator,
          background: this.props.background,
          stacked: this.props.stacked,
          dialogs: {
            NumberOne: React__default['default'].createElement(NumberOneDialog, {__self: this, __source: {fileName: _jsxFileName$6, lineNumber: 22}}),
            NumberTwo: React__default['default'].createElement(NumberTwoDialog, {__self: this, __source: {fileName: _jsxFileName$6, lineNumber: 23}}),
            NumberThree: React__default['default'].createElement(NumberThreeDialog, {__self: this, __source: {fileName: _jsxFileName$6, lineNumber: 24}}),
            New: React__default['default'].createElement(NewDialog, {__self: this, __source: {fileName: _jsxFileName$6, lineNumber: 25}})
          }, __self: this, __source: {fileName: _jsxFileName$6, lineNumber: 13}}
        )
      )
    }
  }

  class DemoStack2 extends React__default['default'].Component {

    render() {
      return(
        React__default['default'].createElement(ReactDialogStack, {
          document:  this.props.document ,
          start: "NewStack",
          open: this.props.open,
          close: this.props.close,
          setNavigator: this.props.setNavigator,
          background: this.props.background,
          stacked: this.props.stacked,
          dialogs: {
            NewStack: React__default['default'].createElement(NewStackDialog, {__self: this, __source: {fileName: _jsxFileName$6, lineNumber: 45}}),
          }, __self: this, __source: {fileName: _jsxFileName$6, lineNumber: 36}}
        )
      )
    }
  }

  exports.DemoStack = DemoStack;
  exports.DemoStack2 = DemoStack2;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
