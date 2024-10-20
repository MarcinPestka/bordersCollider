import { Autocomplete, Button, TextField } from "@mui/material";
import { useState } from "react";
import data from "../../features.json";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  calculateBorder,
  calculateShortestPath,
} from "../services/mapAlgorithms";

import {
  reset,
  resetRoute,
  selectAdjacent,
  selectCountryFrom,
  selectCountryTo,
  setAdjacent,
  setFrom,
  setTo,
} from "../stores/countriesSlice";

export default function Header() {
  const adjacent = useAppSelector(selectAdjacent).value;
  const dispatch = useAppDispatch();
  const options = data.objects.world.geometries.map((x) => x.properties.name);
  const countryFrom = useAppSelector(selectCountryFrom).value;
  const countryTo = useAppSelector(selectCountryTo).value;
  const [disabled, setDisabled] = useState(false);

  function clickToButton(newValue: string | null) {
    dispatch(reset());
    dispatch(resetRoute());
    dispatch(setFrom(newValue));
  }
  function clickFromButton(newValue: string | null) {
    dispatch(reset());
    dispatch(resetRoute());
    dispatch(setTo(newValue));
  }
  async function clickBorderButton() {
    setDisabled(true);
    dispatch(reset());
    dispatch(
      setAdjacent(
        await calculateBorder([{ geoName: countryFrom, step: 0 }], countryTo, 0)
      )
    );
    setDisabled(false);
  }
  async function clickBruteForceButton() {
    setDisabled(true);
    dispatch(reset());
    dispatch(resetRoute());
    await calculateShortestPath(
      countryFrom,
      countryTo,
      adjacent[adjacent.length - 1].step + 1
    );
    setDisabled(false);
  }

  return (
    <div
      id="test"
      style={{
        paddingTop: "20px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "16px",
        position: "absolute",
        left: "0px",
        right: "0px",
        marginInline: "auto",
        width: "fit-content",
        backgroundColor: "#ededed80",
        borderRadius: "3%",
        padding: "20px",
      }}
    >
      <h4>Choose your countries</h4>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "50px",
          flexWrap: "wrap",
        }}
      >
        <Autocomplete
          data-testid="countryFrom-autocomplete"
          disabled={disabled}
          options={options}
          style={{ width: "200px" }}
          value={countryFrom}
          onChange={(_, newValue: string | null) => {
            clickToButton(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Country From" variant="standard" />
          )}
        />
        <Autocomplete
          data-testid="countryTo-autocomplete"
          disabled={disabled}
          options={options}
          style={{ width: "200px" }}
          value={countryTo}
          onChange={(_, newValue: string | null) => {
            clickFromButton(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Country From" variant="standard" />
          )}
        />
      </div>
      <Button
        data-testid="calculateBorder-button"
        disabled={disabled}
        style={{ width: "200px", display: "flex", justifyContent: "center" }}
        onClick={async () => {
          await clickBorderButton();
        }}
      >
        {disabled ? "Calculating..." : "Calculate"}
      </Button>
      {adjacent && adjacent.length > 0 && (
        <Button
          data-testid="bruteForce-button"
          disabled={disabled}
          style={{ width: "200px", display: "flex", justifyContent: "center" }}
          onClick={async () => {
            await clickBruteForceButton();
          }}
        >
          Brute force shortest route
        </Button>
      )}
    </div>
  );
}
