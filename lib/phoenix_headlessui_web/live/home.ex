defmodule PhoenixHeadlessuiWeb.HomeLive do
  use PhoenixHeadlessuiWeb, :live_view

  @options [
    %{value: "ft", label: "Fredrik Teschke"},
    %{value: "jd", label: "John Doe"},
    %{value: "ck", label: "Clark Kent"},
  ]

  @impl true
  def render(assigns) do
    ~H"""
    <x-react-combobox phx-hook="PushEvent" phx-update="ignore" id="react-combobox" options={Jason.encode!(@options)} value={@selected} />
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket
    |> assign(:options, @options)
    |> assign(:selected, "ck")}
  end



  @impl true
  def handle_event("select", %{"value" => value}, socket) do
    {:noreply, assign(socket, :selected, value)}
  end
end
