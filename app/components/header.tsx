import { Autocomplete, Button, TextField } from "@mui/material";
import { SyntheticEvent } from "react";
import data from "../../public/features.json";
import { useAppDispatch, useAppSelector } from "../hooks";
import { calculateBorder } from "../services/mapAlgorithms";

import {
  reset,
  selectCountryFrom,
  selectCountryTo,
  setAdjacent,
  setFrom,
  setTo,
} from "../stores/countriesSlice";

export default function Header() {
  const dispatch = useAppDispatch();
  const options = data.objects.world.geometries.map((x) => x.properties.name);
  const countryFrom = useAppSelector(selectCountryFrom).value;
  const countryTo = useAppSelector(selectCountryTo).value;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h3>Choose your countries</h3>
      <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
        <Autocomplete
          data-testid="countryFrom-autocomplete"
          options={options}
          style={{ width: "200px" }}
          onChange={(event: SyntheticEvent, newValue: string | null) => {
            dispatch(setFrom(newValue));
          }}
          renderInput={(params) => (
            <TextField {...params} label="Country From" variant="filled" />
          )}
        />
        <Autocomplete
          data-testid="countryTo-autocomplete"
          options={options}
          style={{ width: "200px" }}
          onChange={(event: SyntheticEvent, newValue: string | null) => {
            dispatch(setTo(newValue));
          }}
          renderInput={(params) => (
            <TextField {...params} label="Country From" variant="filled" />
          )}
        />
      </div>
      <Button
        style={{ width: "200px", display: "flex", justifyContent: "center" }}
        onClick={async () => {
          dispatch(reset());
          dispatch(
            setAdjacent(
              await calculateBorder(
                [{ geoName: countryFrom, step: 0 }],
                countryTo,
                0
              )
            )
          );
        }}
      >
        Calculate
      </Button>
    </div>
  );
}
