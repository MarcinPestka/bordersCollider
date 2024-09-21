import { SyntheticEvent } from "react";
import { useAppDispatch } from "../hooks";
import { setFrom, setTo } from "../stores/countriesSlice";
import { Autocomplete, TextField } from '@mui/material';
import data from '../../public/features.json';

export default function Header() {
    const dispatch = useAppDispatch()
    const options = data.objects.world.geometries.map(x => x.properties.name);

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
        </div>
    )
}

