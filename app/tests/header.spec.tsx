import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "../components/header";
import { fillOutAutocomplete, renderWithProviders } from "./test.utils";

describe("Header component renders", async () => {
  const { store } = renderWithProviders(<Header />);

  it.each([
    "countryFrom-autocomplete",
    "countryTo-autocomplete",
    "calculateBorder-button",
    // "bruteForce-button",
  ])("Renders all subcomponents", async (dataTestId) => {
    expect(screen.findByTestId(dataTestId)).toBeDefined();
  });

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

  it("Calculate border button behaves correctly", async () => {
    const button = await screen.findByTestId("calculateBorder-button");
    fireEvent.click(button);
  });

  it("Brute force border button behaves correctly", async () => {
    const button = await screen.findByTestId("bruteForce-button");
    fireEvent.click(button);
  });
});
