import { fireEvent, screen, within } from '@testing-library/react'
import { fillOutAutocomplete, renderWithProviders } from './test.utils'
import Header from '../components/header'
import { beforeEach, describe, expect, it, test } from 'vitest'



describe('Header component reders', async () => {
  const { store } = renderWithProviders(<Header />)

  it.each(['countryFrom-autocomplete', 'countryTo-autocomplete'])('Renders all subcomponents', async (dataTestId) => {
    expect(screen.findByTestId(dataTestId)).toBeDefined()
  })

  it.each([{ Search: 'Ger', Value: 'Germany' }, { Search: 'Fra', Value: "France" }])('Handles setting countryFrom values correctly', async ({ Search, Value }) => {
    await fillOutAutocomplete(`countryFrom-autocomplete`, Search);
    expect(store.getState().countryFrom.value).toBe(Value)
  })

  it.each([{ Search: 'Ger', Value: 'Germany' }, { Search: 'Fra', Value: "France" }])('Handles setting countryTo values correctly', async ({ Search, Value }) => {
    await fillOutAutocomplete(`countryTo-autocomplete`, Search);
    expect(store.getState().countryTo.value).toBe(Value)
  })
})