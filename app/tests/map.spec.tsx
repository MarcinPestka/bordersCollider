import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Map from '../components/map'
import { calculateBorder } from '../services/mapAlgorithms'
import { setAdjacent, setFrom, setTo } from '../stores/countriesSlice'
import { renderWithProviders } from './test.utils'



describe('Map component behaves correctly', async () => {
    const { store } = renderWithProviders(<Map />)

    it('Sets correct colors', async () => {
        store.dispatch(setFrom('France'))
        store.dispatch(setTo('Spain'))
        store.dispatch(setAdjacent(calculateBorder([{ geoName: 'Poland', step: 0 }], "Spain", 0)))
        expect((await screen.findByTestId('Poland')).getAttribute('fill')).toBe('#8AD866')
        expect((await screen.findByTestId('Spain')).getAttribute('fill')).toBe('#93CC66')
    })
})