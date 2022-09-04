import * as ReactDOM from "react-dom/client"
import { createElement as h, Fragment } from "react"
import Combobox from "./Combobox"

// https://reactjs.org/docs/web-components.html#using-react-in-your-web-components
export default class ComboboxWebcomponent extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div')
    // https://github.com/tailwindlabs/headlessui/issues/835
    // Shadow DOM not supported (yet) -> lost click events
    // this.attachShadow({ mode: 'closed' })
    this.appendChild(mountPoint)
    this.__reactRoot = ReactDOM.createRoot(mountPoint)
    this.render()    
  }

  render() {
    // attributeChangedCallback triggered before connectedCallback
    if (!this.__reactRoot) {
      return
    }

    const options = JSON.parse(this.getAttribute('options'))
    const value = this.getAttribute('value')
    const onSelect = ({ value }) => {
      const target = this.attributes["phx-target"]?.value
      function onReply() {}
      this.__view.pushHookEvent(target, "select", { value }, onReply)
    }

    this.__reactRoot.render(
      <Combobox options={options} value={value} onSelect={onSelect} />
    )
  }

  static get observedAttributes() {
    return ["options", "value"];
  }

  // https://andyogo.github.io/custom-element-reactions-diagram/
  attributeChangedCallback(attr, value) {
    this.render()
  }
}
