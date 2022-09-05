defmodule PhoenixHeadlessuiWeb.HomeLive do
  use PhoenixHeadlessuiWeb, :live_view

  defmodule Form do
    use Ecto.Schema
    import Ecto.Changeset

    @primary_key false
    embedded_schema do
      field :assignee, :string
    end

    def changeset(%__MODULE__{} = form, params \\ %{}) do
      form
      |> cast(params, [:assignee])
      |> validate_required([:assignee])
    end
  end

  @options [
    %{value: "ft", label: "Fredrik Teschke"},
    %{value: "jd", label: "John Doe"},
    %{value: "ck", label: "Clark Kent"},
  ]

  @impl true
  def render(assigns) do
    ~H"""
    <h2 class="font-bold">Standalone:</h2>
    <x-combobox phx-hook="PushEvent" phx-update="ignore" id="react-combobox" options={Jason.encode!(@options)} value={@selected} />

    <h2 class="font-bold mt-10">With form:</h2>
    <.form let={f} for={@changeset} phx-change="validate" phx-submit="save">
      <%= label f, :assignee %>
      <%= hidden_input f, :assignee, id: "assignee-input" %>
      <x-combobox-form class="block mb-5" input-id="assignee-input" phx-update="ignore" id="react-form-combobox" options={Jason.encode!(@options)} />
      <%= error_tag f, :assignee %>

      <%= submit "Save", class: "mt-5 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" %>
    </.form>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket
    |> assign(:options, @options)
    |> assign(:selected, "jd")
    |> assign(:changeset, Form.changeset(%Form{}))}
  end

  @impl true
  def handle_event("select", %{"value" => value}, socket) do
    {:noreply, assign(socket, :selected, value)}
  end

  def handle_event("validate", %{"form" => params}, socket) do
    {:noreply, assign(socket, :changeset, Form.changeset(%Form{}, params))}
  end

  def handle_event("save", %{"form" => params}, socket) do
    result = Form.changeset(%Form{}, params)
    |> Ecto.Changeset.apply_action(:create)

    case result do
      {:ok, data} -> {:noreply, put_flash(socket, :info, "Saved #{inspect data}!")}
      {:error, changeset} -> {:noreply, assign(socket, :changeset, changeset)}
    end
  end
end
