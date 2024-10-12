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
  resetVisited,
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
            dispatch(reset());
            dispatch(setFrom(newValue));
          }}
          renderInput={(params) => (
            <TextField {...params} label="Country From" variant="filled" />
          )}
        />
        <Autocomplete
          data-testid="countryTo-autocomplete"
          disabled={disabled}
          options={options}
          style={{ width: "200px" }}
          value={countryTo}
          onChange={(_, newValue: string | null) => {
            dispatch(reset());
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
      {adjacent.length > 0&& (
        <Button
          disabled={disabled}
          style={{ width: "200px", display: "flex", justifyContent: "center" }}
          onClick={async () => {
            setDisabled(true);
            dispatch(resetVisited());
            dispatch(
              setAdjacent(
                await calculateShortestPath(
                  countryFrom,
                  countryTo,
                  adjacent[adjacent.length - 1].step + 1
                )
              )
            );
            setDisabled(false);
          }}
        >
          Show shortest route
        </Button>
      )}
    </div>
  );
}
