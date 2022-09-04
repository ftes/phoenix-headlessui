import * as ReactDOM from "react-dom/client"
import Combobox from "./Combobox"

// https://reactjs.org/docs/web-components.html#using-react-in-your-web-components
export default class ComboboxWebComponent extends HTMLElement {
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
      this.__pushEvent("select", { value })
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
