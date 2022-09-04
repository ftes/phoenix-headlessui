const PushEventHook = {
  mounted() {
    const target = this.el.attributes["phx-target"]?.value

    this.el.__pushEvent = (event, value, onReply = () => {}) =>
      target
        ? this.pushEventTo(target, event, value, onReply)
        : this.pushEvent(event, value, onReply)
  }
}

export default PushEventHook;
