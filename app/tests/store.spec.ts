import { describe, expect, it } from "vitest";
import {
  AdjacentReducer,
  appendRoute,
  appendVisited,
  CountryFromReducer,
  CountryToReducer,
  popRoute,
  removeFrom,
  removeTo,
  reset,
  resetVisited,
  setAdjacent,
  setFrom,
  setTo,
  VisitedReducer,
} from "../stores/countriesSlice";

describe("CountryFromSlice works correctly", () => {
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

describe("CountryToSlice works correctly", () => {
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

describe("AdjacentSlice works correctly", () => {
  it.each(["France", "Germany", "Tanzania"])(
    "Sets adjacent country correctly",
    (country) => {
      expect(AdjacentReducer(undefined, setAdjacent(country))).toEqual({
        value: country,
      });
    }
  );

  it("Pops adjacent country", () => {
    expect(
      AdjacentReducer({ value: [{ geoName: "France", step: 0 }] }, popRoute())
    ).toEqual({
      value: [],
    });
  });

  it("Appends adjacent countries array", () => {
    expect(
      AdjacentReducer(
        { value: [{ geoName: "France", step: 0 }] },
        appendRoute({ geoName: "Germany", step: 1 })
      )
    ).toEqual({
      value: [
        { geoName: "France", step: 0 },
        { geoName: "Germany", step: 1 },
      ],
    });
  });

  it("Resets adjacent countries array", () => {
    expect(
      AdjacentReducer({ value: [{ geoName: "France", step: 0 }] }, reset())
    ).toEqual({
      value: [],
    });
  });
});

describe("VisitedSlice works correctly", () => {
  it("Appends visited countries correctly", () => {
    expect(
      VisitedReducer(
        { value: [{ geoName: "France", step: 0 }] },
        appendVisited([{ geoName: "Germany", step: 1 }])
      )
    ).toEqual({
      value: [
        { geoName: "France", step: 0 },
        { geoName: "Germany", step: 1 },
      ],
    });
  });

  it("Resets visited countries array", () => {
    expect(
      VisitedReducer(
        { value: [{ geoName: "France", step: 0 }] },
        resetVisited()
      )
    ).toEqual({
      value: [],
    });
  });
});
