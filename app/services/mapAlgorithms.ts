import data from "../../country_adj.json";
import { store } from "../root";
import { setAdjacent } from "../stores/countriesSlice";

export interface Color {
  geoName: string;
  step: number;
}

function getAdjacent(name: string, step: number): Color[] {
  return data[name as keyof typeof data].map((x) => {
    return { geoName: x, step: step };
  });
}
const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function calculateBorder(
  names: Color[],
  searchFor: string,
  step: number
) {
  const adjacentArray: Color[] = [];
  for (const name of names) {
    adjacentArray.push(
      ...getAdjacent(name.geoName, step).filter(
        (x) => !adjacentArray.find((y) => y.geoName === x.geoName)
      )
    );
  }
  while (!adjacentArray.some((x) => x.geoName === searchFor)) {
    step = step + 1;
    store.dispatch(setAdjacent([...adjacentArray].map((x) => x)));
    await timeout(200);
    adjacentArray.push(
      ...(await calculateBorder(adjacentArray, searchFor, step))
    );
  }
  return adjacentArray;
}
