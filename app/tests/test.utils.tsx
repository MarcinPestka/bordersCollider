import {
  fireEvent,
  render,
  RenderOptions,
  screen,
} from "@testing-library/react";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import type { AppStore, RootState } from "../stores/countriesStore";
import { setupStore } from "../stores/countriesStore";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export async function fillOutAutocomplete(testId: string, text: string) {
  const autocomplete = await screen.findByTestId(testId);
  const input = autocomplete.querySelector("input");
  if (input) {
    input.focus();
    fireEvent.change(input, { target: { value: text } });
    autocomplete.focus();
    fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
    fireEvent.keyDown(autocomplete, { key: "Enter" });
  }
}
