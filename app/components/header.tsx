import { Autocomplete, Button, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import data from "../../features.json";
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
  const [disabled, setDisabled] = useState(false);
  return (
    <div
      id="test"
      style={{
        marginTop: "20px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <span>Choose your countries</span>
      <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
        <Autocomplete
          data-testid="countryFrom-autocomplete"
          options={options}
          style={{ width: "200px" }}
          defaultValue={countryFrom}
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
          defaultValue={countryTo}
          onChange={(event: SyntheticEvent, newValue: string | null) => {
            dispatch(setTo(newValue));
          }}
          renderInput={(params) => (
            <TextField {...params} label="Country From" variant="filled" />
          )}
        />
      </div>
      <Button
        disabled={disabled}
        style={{ width: "200px", display: "flex", justifyContent: "center" }}
        onClick={async () => {
          setDisabled(true);
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
          setDisabled(false);
        }}
      >
        {disabled ? "Calculating..." : "Calculate"}
      </Button>
    </div>
  );
}
