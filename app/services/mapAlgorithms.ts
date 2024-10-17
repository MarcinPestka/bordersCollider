import data from "../../country_adj.json";
import { store } from "../root";
import {
  appendRoute,
  appendVisited,
  popRoute,
  setAdjacent,
} from "../stores/countriesSlice";

export interface AlgoStep {
  geoName: string;
  step: number;
}

function getAdjacent(name: string, step: number): AlgoStep[] {
  return data[name as keyof typeof data].map((x) => {
    return { geoName: x, step: step };
  });
}
const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function calculateBorder(
  names: AlgoStep[],
  searchFor: string,
  step: number
) {
  const adjacentArray: AlgoStep[] = [];
  for (const name of names) {
    adjacentArray.push(
      ...getAdjacent(name.geoName, step).filter(
        (x) => !adjacentArray.find((y) => y.geoName === x.geoName)
      )
    );
  }
  while (!adjacentArray.some((x) => x.geoName === searchFor)) {
    step = step + 1;
    const tempAdjacent = [...store.getState()["adjacent"].value];
    tempAdjacent.push(
      ...[...adjacentArray].filter(
        (x) =>
          !store
            .getState()
            ["adjacent"].value.find((y) => y.geoName === x.geoName)
      )
    );
    store.dispatch(setAdjacent(tempAdjacent));
    await timeout(200);
    adjacentArray.push(
      ...(await calculateBorder(adjacentArray, searchFor, step))
    );
  }
  return adjacentArray;
}

function GetNotVisited(searchFrom: string, step: number, visited: AlgoStep[]) {
  return getAdjacent(searchFrom, step).filter(
    (x) => !visited.some((y) => y.geoName === x.geoName)
  );
}

export async function calculateShortestPath(
  searchFrom: string,
  searchTo: string,
  maxSteps: number,
  visited: AlgoStep[] = [{ geoName: searchFrom, step: 0 }]
) {
  if (maxSteps === 0) {
    return undefined;
  }

  const step = maxSteps - 1;
  const adjacentArray: AlgoStep[] = [];
  adjacentArray.push(...GetNotVisited(searchFrom, step, visited));
  visited = [...visited, ...adjacentArray];
  for (const adjacent of adjacentArray) {
    if (adjacent.geoName === searchTo) {
      store.dispatch(appendVisited(store.getState().adjacent.value));
    }
    store.dispatch(appendRoute(adjacent));
    await timeout(10);
    if (
      (await calculateShortestPath(
        adjacent.geoName,
        searchTo,
        step,
        visited
      )) === undefined
    ) {
      store.dispatch(popRoute());
    }
  }
}
