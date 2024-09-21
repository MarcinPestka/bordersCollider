import { screen } from '@testing-library/react'
import { renderWithProviders } from './test.utils'
import { describe, expect, it } from 'vitest'
import Map from '../components/map'
import { setFrom, setTo } from '../stores/countriesSlice'



describe('Header component reders', async () => {
    const { store } = renderWithProviders(<Map />)

    it('Renders all subcomponents', async () => {
        store.dispatch(setFrom('France'))
        store.dispatch(setTo('Poland'))
        expect((await screen.findByTestId('Poland')).getAttribute('fill')).toBe('green')
        expect((await screen.findByTestId('France')).getAttribute('fill')).toBe('red')
    })
})