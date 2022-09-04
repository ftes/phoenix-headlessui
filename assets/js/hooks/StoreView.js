const StoreViewHook = {
  mounted() {
    this.el.__view = this.__view
  }
}

export default StoreViewHook;
