import data from '../../public/country_adj.json';
import { store } from '../root';
import { setAdjacent } from "../stores/countriesSlice";

export interface Color {
    geoName: string,
    step: number
  }

function getAdjacent(name: string, step: number):Color[] {
    return data[name as keyof typeof data].map(x=>{return {geoName:x,step:step}});
}

export function calculateBorder(names:Color[], searchFor: string, step:number) {
  const adjacentArray:Color[] = [];
    for (const name of names) {
      adjacentArray.push(...getAdjacent(name.geoName,step).filter(x=> !adjacentArray.find(y=>y.geoName === x.geoName)));
    }
    while (!adjacentArray.some(x=>x.geoName === searchFor)) {
      step = step+1;
      store.dispatch(setAdjacent([...adjacentArray].map(x=>x)))
      adjacentArray.push(...calculateBorder(adjacentArray,searchFor,step));        
    }
      return adjacentArray;
  }