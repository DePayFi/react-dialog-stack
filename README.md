## Quickstart

```
yarn add depay-react-dialog-stack
```

or 

```
npm install --save depay-react-dialog-stack
```

```javascript
import { ReactDialogStack } from 'depay-react-dialog-stack'

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

## Functionalities

### Render

```javascript
import { ReactDialogStack } from 'depay-react-dialog-stack'

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

`document (Document)`: Allows to forward a different document where the dialog is supposed to live in (created through ReactDOM portal).

```javascript

  <ReactDialogStack 
    document={someIframe.document}
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
import { CloseStackContext } from 'depay-react-dialog-stack'

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

`NavigateStackContext` provides `navigate` which can be used to stack/navigate another dialog.

Either pass the dialog name as configured in `ReactDialogStack` prop named `dialogs` or pass `back` to unstack the current dialog. 

```javascript
import { NavigateStackContext } from 'depay-react-dialog-stack'

render() {
  return(
    <NavigateStackContext.Consumer>
      {navigate => (
        <div>
          <h1>I am the start dialog</h1>
          <button onClick={()=>navigate('DialogName')}>
            Next Dialog
          </button>
          <button onClick={()=>navigate('back')}>
            Back
          </button>
        </div>
      )}
    </NavigateStackContext.Consumer>
  )
}
```

## Development

### Get started

```
yarn install
yarn start
```

### Release

```
npm publish
```

### Testing

#### Test single file

```
yarn test --spec "cypress/integration/my-spec.js"
```

#### Show interactive Cypress browser

```
yarn test --headed
```
