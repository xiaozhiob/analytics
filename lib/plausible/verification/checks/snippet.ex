defmodule Plausible.Verification.Checks.Snippet do
  @moduledoc """
  The check looks for Plausible snippets and tries to address the common
  integration issues, such as bad placement, data-domain typos, unknown 
  attributes frequently added by performance optimization plugins, etc.
  """
  use Plausible.Verification.Check

  @impl true
  def friendly_name, do: "We're looking for the Plausible snippet on your site"

  @impl true
  def perform(%State{assigns: %{document: document}} = state) do
    in_head = Floki.find(document, "head script[data-domain]")
    in_body = Floki.find(document, "body script[data-domain]")

    all = in_head ++ in_body

    put_diagnostics(state,
      snippets_found_in_head: Enum.count(in_head),
      snippets_found_in_body: Enum.count(in_body),
      proxy_likely?: proxy_likely?(all),
      snippet_unknown_attributes?: unknown_attributes?(all),
      data_domain_mismatch?: data_domain_mismatch?(all, state.data_domain)
    )
  end

  def perform(state), do: state

  defp proxy_likely?(nodes) do
    nodes
    |> Floki.attribute("src")
    |> Enum.any?(&(not String.starts_with?(&1, PlausibleWeb.Endpoint.url())))
  end

  @known_attributes ["data-domain", "src", "defer", "data-api", "data-exclude", "data-include"]
  @known_prefix "event-"

  defp unknown_attributes?(nodes) do
    Enum.any?(nodes, fn {_, attrs, _} ->
      Enum.any?(attrs, fn {key, _} ->
        key not in @known_attributes and not String.starts_with?(key, @known_prefix)
      end)
    end)
  end

  defp data_domain_mismatch?(nodes, data_domain) do
    nodes
    |> Floki.attribute("data-domain")
    |> Enum.any?(&(&1 != data_domain and data_domain not in String.split(&1, ",")))
  end
end
