import Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :phoenix_headlessui, PhoenixHeadlessuiWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "4VZnV3L3i39sid9t57GcGzUUGnm+bEHFWPjg6vro8HA2Ema9V7xJzZZhw3bGMVm+",
  server: false

# In test we don't send emails.
config :phoenix_headlessui, PhoenixHeadlessui.Mailer,
  adapter: Swoosh.Adapters.Test

# Print only warnings and errors during test
config :logger, level: :warn

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
