import * as ReactDOM from "react-dom/client"
import Combobox from "./Combobox"

// https://reactjs.org/docs/web-components.html#using-react-in-your-web-components
export default class ComboboxFormWebcomponent extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div')
    this.appendChild(mountPoint)
    this.__reactRoot = ReactDOM.createRoot(mountPoint)
    const inputId = this.getAttribute("input-id")
    this.inputEl = document.getElementById(inputId)

    this.inputEl.addEventListener("change", this.onValueChange)
    this.render()
  }

  disconnectedCallback() {
    this.inputEl.removeEventListener("change", this.onValueChange)
  }

  render() {
    // attributeChangedCallback triggered before connectedCallback
    if (!this.__reactRoot) {
      return
    }

    const options = JSON.parse(this.getAttribute('options'))
    const value = this.inputEl.getAttribute('value')
    const onSelect = ({ value }) => {
      this.inputEl.value = value
      // https://hexdocs.pm/phoenix_live_view/js-interop.html#triggering-phx-form-events-with-javascript
      this.inputEl.dispatchEvent(new Event("input", {bubbles: true}))
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

  onValueChange = () => this.render()
}
