const PushEventHook = {
  mounted() {
    this.el.__pushEvent = this.pushEvent?.bind(this)
    this.el.__pushEventTo = this.pushEventTo?.bind(this)
  }
}

export default PushEventHook;
