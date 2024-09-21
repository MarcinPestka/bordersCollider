import { SyntheticEvent } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectCountryFrom, selectCountryTo, setFrom, setTo, selectAdjecent, reset } from "../stores/countriesSlice";
import { Autocomplete, TextField, Button } from '@mui/material';
import data from '../../public/features.json';
import { calculateBorder } from "~/services/mapAlgorythms";
import { setAdjecent } from "../stores/countriesSlice";

export default function Header() {
    const dispatch = useAppDispatch()
    const options = data.objects.world.geometries.map(x => x.properties.name);
    const countryFrom = useAppSelector(selectCountryFrom).value
    const countryTo = useAppSelector(selectCountryTo).value

    return (
        <div>
            <h3 style={{ display: 'flex', justifyContent: "center" }}>Choose your countries</h3>
            <div style={{ display: 'flex', justifyContent: "center", gap: '50px' }}>
                <Autocomplete
                    data-testid="countryFrom-autocomplete"
                    options={options}
                    style={{ width: '200px' }}
                    onChange={(event: SyntheticEvent, newValue: string | null) => {
                        dispatch(setFrom(newValue));
                    }}
                    renderInput={(params) => <TextField {...params} label="Country From" variant="filled" />}
                />
                <Autocomplete
                    data-testid="countryTo-autocomplete"
                    options={options}
                    style={{ width: '200px' }}
                    onChange={(event: SyntheticEvent, newValue: string | null) => {
                        dispatch(setTo(newValue));
                    }}
                    renderInput={(params) => <TextField {...params} label="Country From" variant="filled" />}
                />
            </div>
            <Button onClick={() => { dispatch(reset()); dispatch(setAdjecent(calculateBorder([{ geoName: countryFrom, step: 0 }], countryTo, 0))) }}>Elo</Button>
        </div >
    )
}

