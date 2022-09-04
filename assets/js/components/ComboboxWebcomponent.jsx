import * as ReactDOM from "react-dom/client"
import Combobox from "./Combobox"

// https://reactjs.org/docs/web-components.html#using-react-in-your-web-components
export default class ComboboxWebcomponent extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div')
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
      function onReply() {}
      const target = this.attributes["phx-target"]?.value ?? null
      return target
        ? this.__pushEventTo(target, "select", { value }, onReply)
        : this.__pushEvent("select", { value }, onReply)
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
