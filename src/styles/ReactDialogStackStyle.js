export default function () {
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
