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
    console.log(adjacentArray);
    // console.log(store.getState()["adjacent"].value);
    // console.log(
    //   [...adjacentArray].filter(
    //     (x) =>
    //       !store
    //         .getState()
    //         ["adjacent"].value.find((y) => y.geoName === x.geoName)
    //   )
    // );
    step = step + 1;
    const test = [...store.getState()["adjacent"].value];
    const elo = [...adjacentArray].filter(
      (x) =>
        !store.getState()["adjacent"].value.find((y) => y.geoName === x.geoName)
    );
    console.log(test);
    console.log(test.push(...elo));
    store.dispatch(setAdjacent(test));
    await timeout(200);
    adjacentArray.push(
      ...(await calculateBorder(adjacentArray, searchFor, step))
    );
  }
  return adjacentArray;
}
