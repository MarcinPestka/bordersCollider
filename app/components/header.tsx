import { SyntheticEvent } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectCountryFrom, selectCountryTo, setFrom, setTo } from "../stores/countriesSlice";
import { Autocomplete, TextField } from '@mui/material';

export default function Header() {
    const dispatch = useAppDispatch()
    const countryFrom = useAppSelector(selectCountryFrom).value
    const countryTo = useAppSelector(selectCountryTo).value

    return (
        <div>
            <h3 style={{ display: 'flex', justifyContent: "center" }}>Choose your countries</h3>
            <div style={{ display: 'flex', justifyContent: "center", gap: '50px' }}>
                <Autocomplete
                    data-testid="countryFrom-autocomplete"
                    options={[
                        'France',
                        'Germany']}
                    style={{ width: '200px' }}
                    onChange={(event: SyntheticEvent, newValue: string | null) => {
                        dispatch(setFrom(newValue));
                    }}
                    renderInput={(params) => <TextField {...params} label="Country From" variant="filled" />}
                />
                <Autocomplete
                    data-testid="countryTo-autocomplete"
                    options={[
                        'France',
                        'Germany']}
                    style={{ width: '200px' }}
                    onChange={(event: SyntheticEvent, newValue: string | null) => {
                        dispatch(setTo(newValue));
                    }}
                    renderInput={(params) => <TextField {...params} label="Country From" variant="filled" />}
                />
            </div>
            <p>From: {countryFrom}</p>
            <p>To: {countryTo}</p>
        </div>
    )
}

