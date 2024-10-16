import { describe, expect, it } from "vitest";
import {
  CountryFromReducer,
  CountryToReducer,
  removeFrom,
  removeTo,
  setFrom,
  setTo,
} from "../stores/countriesSlice";

describe("CountryFromReducer works correctly", () => {
  it.each(["France", "Germany", "Tanzania"])(
    "Sets from country correctly",
    (country) => {
      expect(CountryFromReducer(undefined, setFrom(country))).toEqual({
        value: country,
      });
    }
  );

  it("Overwrites previously set country", () => {
    expect(CountryFromReducer({ value: "France" }, setFrom("Germany"))).toEqual(
      { value: "Germany" }
    );
  });

  it("Removes the country correctly", () => {
    expect(CountryFromReducer({ value: "France" }, removeFrom())).toEqual({
      value: "",
    });
  });
});

describe("CountryToReducer works correctly", () => {
  it.each(["France", "Germany", "Tanzania"])(
    "Sets to country correctly",
    (country) => {
      expect(CountryToReducer(undefined, setTo(country))).toEqual({
        value: country,
      });
    }
  );

  it("Overwrites previously set country", () => {
    expect(CountryToReducer({ value: "France" }, setTo("Germany"))).toEqual({
      value: "Germany",
    });
  });

  it("Removes to country correctly", () => {
    expect(CountryToReducer({ value: "France" }, removeTo())).toEqual({
      value: "",
    });
  });
});
