const PushEventHook = {
  mounted() {
    this.el.__pushHookEvent = this.__view.pushHookEvent?.bind(this.__view)
  }
}

export default PushEventHook;
