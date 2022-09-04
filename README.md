# Phoenix LiveView + HeadlessUI

What a pair! They work together well using react + web components.

What works:
- react component `C` using HeadlessUI
- wrapped in a custom web component `W`, rendered in light DOM
- server -> client: watch HTML attribute changes in `W` via `observeAttributes` API
- client -> server: push LiveView events from `C` by exposing the LiveView `pushEvent` JS API using a minimal `PushHookEvent` hook

Abandoned approaches:
- render to shadow DOM ([no HeadlessUI support](https://github.com/tailwindlabs/headlessui/issues/835) -> glitches)
- [vue](https://github.com/ftes/phoenix-headlessui/tree/vue)
  - setup for SFCs (single file components) with minimalistic esbuild setup not worth the hassle
  - using Vue with JSX makes TailwindUI example code difficult to port
  - `defineCustomElement` web component wrapper does [not support rendering to light DOM](https://github.com/vuejs/core/issues/4314)
- [preact](https://github.com/ftes/phoenix-headlessui/tree/preact) (instead of react)
  - Components don't render -> didn't dig deeper


## Run the demo

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: https://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Forum: https://elixirforum.com/c/phoenix-forum
  * Source: https://github.com/phoenixframework/phoenix
