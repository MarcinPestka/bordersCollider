import { beforeEach, describe, expect, it, vi } from "vitest";
import { store } from "../root";
import { calculateShortestPath } from "../services/mapAlgorithms";
import { resetRoute } from "../stores/countriesSlice";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
vi.spyOn(globalThis, "setTimeout").mockImplementation((fn: () => any) => {
  return fn();
});

describe("Shortes route brute force works", () => {
  beforeEach(() => {
    store.dispatch(resetRoute());
  });

  it.each([
    {
      from: "Poland",
      to: "Spain",
      result: [
        { geoName: "Germany", step: 3 },
        { geoName: "France", step: 2 },
      ],
      steps: 4,
    },
    {
      from: "Russia",
      to: "Canada",
      result: [
        {
          geoName: "Poland",
          step: 12,
        },
        {
          geoName: "Germany",
          step: 11,
        },
        {
          geoName: "France",
          step: 10,
        },
        {
          geoName: "Brazil",
          step: 9,
        },
        {
          geoName: "Colombia",
          step: 8,
        },
        {
          geoName: "Panama",
          step: 7,
        },
        {
          geoName: "Costa Rica",
          step: 6,
        },
        {
          geoName: "Nicaragua",
          step: 5,
        },
        {
          geoName: "Honduras",
          step: 4,
        },
        {
          geoName: "Guatemala",
          step: 3,
        },
        {
          geoName: "Mexico",
          step: 2,
        },
        {
          geoName: "United States",
          step: 1,
        },
      ],
      steps: 13,
    },
  ])("Sets from country correctly", async (values) => {
    await calculateShortestPath(values.from, values.to, values.steps);
    expect(store.getState().route.value).toEqual(values.result);
  });
});
