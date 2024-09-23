import { screen } from "@testing-library/react";
import { ZoomableGroupProps } from "react-simple-maps";
import { describe, expect, it, vi } from "vitest";
import Map from "../components/map";
import { calculateBorder } from "../services/mapAlgorithms";
import { setAdjacent, setFrom, setTo } from "../stores/countriesSlice";
import { renderWithProviders } from "./test.utils";

interface test {
  key: string;
  color: string;
}

interface test2 {
  from: string;
  to: string;
  array: test[];
}

describe("Map component behaves correctly", async () => {
  vi.mock("react-simple-maps", async () => {
    return {
      ...(await vi.importActual("react-simple-maps")),
      ZoomableGroup: ({ children }: ZoomableGroupProps): JSX.Element => (
        <>{children}</>
      ),
    };
  });
  const { store } = renderWithProviders(<Map />);
  it.each([
    {
      from: "Canada",
      to: "Papua New Guinea",
      array: [
        { key: "United States", color: "#524DFF" },
        { key: "Mexico", color: "#5651FF" },
        { key: "Guatemala", color: "#5A56FF" },
        { key: "Honduras", color: "#5F5AFF" },
        { key: "Nicaragua", color: "#635EFF" },
        { key: "Costa Rica", color: "#6762FF" },
        { key: "Panama", color: "#6B67FF" },
        { key: "Colombia", color: "#6F6BFF" },
        // { key: "", color: "#" },
        // { key: "", color: "#" },
        // { key: "", color: "#" },
        // { key: "", color: "#" },
        // { key: "", color: "#" },
      ],
    },
  ])("Sets correct colors", async (testObject: test2) => {
    store.dispatch(setFrom(testObject.from));
    store.dispatch(setTo(testObject.to));
    store.dispatch(
      setAdjacent(
        await calculateBorder(
          [{ geoName: testObject.from, step: 0 }],
          testObject.to,
          0
        )
      )
    );
    await expect(
      (await screen.findByTestId(testObject.from)).getAttribute("fill")
    ).toBe("#dedede");
    expect(
      (await screen.findByTestId(testObject.to)).getAttribute("fill")
    ).toBe("#dedede");
    for (const item of testObject.array) {
      expect((await screen.findByTestId(item.key)).getAttribute("fill")).toBe(
        item.color
      );
    }
  });
});
