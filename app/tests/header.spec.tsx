import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "../components/header";
import { fillOutAutocomplete, renderWithProviders } from "./test.utils";

describe("Header component reders", async () => {
  const { store } = renderWithProviders(<Header />);

  it.each(["countryFrom-autocomplete", "countryTo-autocomplete"])(
    "Renders all subcomponents",
    async (dataTestId) => {
      expect(screen.findByTestId(dataTestId)).toBeDefined();
    }
  );

  it.each([
    { Search: "Ger", Value: "Germany" },
    { Search: "Fra", Value: "France" },
  ])(
    "Handles setting countryFrom values correctly",
    async ({ Search, Value }) => {
      await fillOutAutocomplete(`countryFrom-autocomplete`, Search);
      expect(store.getState().countryFrom.value).toBe(Value);
    }
  );

  it.each([
    { Search: "Ger", Value: "Germany" },
    { Search: "Fra", Value: "France" },
  ])(
    "Handles setting countryTo values correctly",
    async ({ Search, Value }) => {
      await fillOutAutocomplete(`countryTo-autocomplete`, Search);
      expect(store.getState().countryTo.value).toBe(Value);
    }
  );
});
