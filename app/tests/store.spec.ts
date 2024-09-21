import  { CountryFromSlice, CountryFromReducer, setFrom, removeFrom } from '../stores/countriesSlice'
import {describe, expect, it, test} from 'vitest'

describe('CountryFromReducer works correctly', () => {
    it.each(['France','Germany','Tanzania'])
    ('Sets from country correctly', (country) => {
        expect(CountryFromReducer(undefined, setFrom(country))).toEqual({ value: country })
    });

    it('Overrites previously set country', () => {
        expect(CountryFromReducer({value:'France'}, setFrom('Germany'))).toEqual({ value: 'Germany' })
    });

    it('Removes the country correctly', () => {
        expect(CountryFromReducer({value:'France'}, removeFrom())).toEqual({ value: '' })
    });
  });
