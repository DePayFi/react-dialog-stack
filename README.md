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

  <ReactDialogStack
  />
```

## Functionalities

### Render

```javascript
import { ReactDialog } from 'depay-react-dialog'

render() {
  return(
    ...
    <ReactDialog close={this.close} open={this.state.showDialog}>
      <h1>I am a dialog</h1>
      <button onclick={this.close}>Close Dialog</button>
    </ReactDialog>
  )
}
```

#### Props

`close (function)`: A function living in the dialog parent that is called from the ReactDialog on a close attempt. The parent has to take care if a dialog is closable, and needs to set it's own state accordingly.

```javascript
  close() {
    if(this.state == something) {
      this.setState({ showDialog: false })
    }
  }

  /*...*/

  <ReactDialog close={this.close} open={this.state.showDialog}>
    <h1>I am a dialog</h1>
    <button onclick={this.close}>Close Dialog</button>
  </ReactDialog>
```

`background (string)`: Background passed as CSS to the `ReactDialogBackground`.

```javascript
  <ReactDialog background={'rgba(255,255,255,0.6)'} close={this.close} open={this.state.showDialog}>
    <h1>I am a dialog with white background.</h1>
  </ReactDialog>
```

`document (Document)`: Allows to forward a different document where the dialog is supposed to live in (created through ReactDOM portal).

```javascript

  <ReactDialog document={someIframe.document}>
    <h1>I am a dialog</h1>
    <button onclick={this.close}>Close Dialog</button>
  </ReactDialog>
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
