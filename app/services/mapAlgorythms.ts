import { useAppDispatch } from '../hooks';
import data from '../../public/country_adj.json'
import { setAdjecent } from "../stores/countriesSlice";
import { setupStore } from "../stores/countreisStore";
import { store } from '~/root';

export interface Color {
    geoName: string,
    step: number
  }

function getadjecent(name: string, step: number):Color[] {
    return data[name].map(x=>{return {geoName:x,step:step}});
}

export function calculateBorder(names:Color[], searchFor: string, step:number) {
  const adjecentArray:Color[] = [];
    for (const name of names) {
      adjecentArray.push(...getadjecent(name.geoName,step).filter(x=> !adjecentArray.find(y=>y.geoName === x.geoName)));
    }
    while (!adjecentArray.some(x=>x.geoName === searchFor)) {
      step = step+1;
      store.dispatch(setAdjecent([...adjecentArray].map(x=>x)))
      adjecentArray.push(...calculateBorder(adjecentArray,searchFor,step));        
    }
      return adjecentArray;
  }