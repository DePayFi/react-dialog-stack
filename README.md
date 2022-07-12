## Quickstart

```
yarn add @depay/react-dialog-stack
```

or 

```
npm install --save @depay/react-dialog-stack
```

```javascript
import { ReactDialogStack } from '@depay/react-dialog-stack'

  closeDialogStack() {
    this.setState({openDialogStack: false});
  }

render() {
  return(
    <ReactDialogStack
      open={this.state.openDialogStack}
      close={this.closeDialogStack}
      start='StartDialog'
      dialogs={{
        StartDialog: <StartDialog/>,
        SecondDialog: <SecondDialog/>,
        ThirdDialog: <ThirdDialog/>
      }}
    />
  )
}

```

## Demo

https://depayfi.github.io/react-dialog-stack/demo.html

## Functionalities

### Render

```javascript
import { ReactDialogStack } from '@depay/react-dialog-stack'

render() {
  return(
    <ReactDialogStack
      open={this.state.openDialogStack}
      close={this.closeDialogStack}
      start='StartDialog'
      dialogs={{
        StartDialog: <StartDialog/>,
        SecondDialog: <SecondDialog/>,
        ThirdDialog: <ThirdDialog/>
      }}
    />
  )
}
```

#### Props

`close (function)`: A function living in the dialog stack parent that is called from the ReactDialogStack on a close attempt. The parent has to take care if a dialog is closable, and needs to set it's own state accordingly.

```javascript
  close() {
    if(this.state == something) {
      this.setState({ showDialog: false })
    }
  }

  /*...*/

  <ReactDialogStack
    close={this.close}
    open={this.state.showDialog}
  />
```

`setNavigator (function)`: A function which will be called from the stack construtor to share the navigator to the outside:

```javascript
  const setNavigator = (navigator)=> {
    window.dialogNavigator = navigator
  }

  /*...*/

  <ReactDialogStack
    close={this.close}
    setNavigator={setNavigator}
    open={this.state.showDialog}
  />

  /*...*/

  window.dialogNavigator.navigate('AnotherDialog')
  window.dialogNavigator.set('AnotherDialog')
```

`document (Document)`: Allows to forward a different document where the dialog is supposed to live in (created through ReactDOM portal).

```javascript

  <ReactDialogStack 
    document={someIframe.document}
  />
```

`container (HTMLElement)`: Allows to provide an explicit container the dialog stack is rendered into (created through ReactDOM portal).

```javascript

  <ReactDialogStack 
    container={document.getElementById('app')}
  />
```

`background (string)`: Background passed as CSS to the `ReactDialog`.

```javascript
  <ReactDialogStack
    background={'rgba(255,255,255,0.6)'}
  />
```

### Contexts

Contexts can be used in dialogs passed to `ReactDialogStack` in order to communicate with the stack manager.

#### CloseStackContext

`CloseStackContext` provides `close` which can be used to close the entire `ReactDialogStack`.

```javascript
import { CloseStackContext } from '@depay/react-dialog-stack'

render() {
  return(
    <CloseStackContext.Consumer>
      {close => (
        <div>
          <h1>I am the start dialog</h1>
          <button onClick={close}>
            Close Stack
          </button>
        </div>
      )}
    </CloseStackContext.Consumer>
  )
}
```

#### NavigateStackContext

`NavigateStackContext` provides `navigate` which can be used to stack/navigate another dialog and `set` which allows you to set the entire stack (without animation).

Either pass the dialog name as configured in `ReactDialogStack` prop named `dialogs` or pass `back` to `navigate` to unstack the current dialog. 

```javascript
import { NavigateStackContext } from '@depay/react-dialog-stack'

render() {
  return(
    <NavigateStackContext.Consumer>
      {({ navigate, set }) => (
        <div>
          <h1>I am the start dialog</h1>
          <button onClick={()=>navigate('DialogName')}>
            Next Dialog
          </button>
          <button onClick={()=>navigate('back')}>
            Back
          </button>
          <button onClick={()=>set(['DialogName'])}>
            Back
          </button>
        </div>
      )}
    </NavigateStackContext.Consumer>
  )
}
```

#### StackContext

`StackContext` provides `stack` which provides information about the current stack:

```javascript
import { StackContext } from '@depay/react-dialog-stack'

render() {
  return(
    <StackContext.Consumer>
      {stack => (
        <div>
          Current Stack:
          { stack }
        </div>
      )}
    </StackContext.Consumer>
  )
}
```

## Development

### Get started

```
yarn install
yarn dev
```

### Release

```
npm publish
```

### Testing

#### Test single integration test

```
yarn test:cypress:debug --spec 'cypress/integration/navigate.js'
```

#### Show interactive Cypress browser

```
yarn test --headed
```
