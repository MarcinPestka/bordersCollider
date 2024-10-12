import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  ZoomableGroup,
} from "react-simple-maps";
import data from "../../features.json";
import { useAppSelector } from "../hooks";
import {
  selectAdjacent,
  selectCountryFrom,
  selectCountryTo,
} from "../stores/countriesSlice";

export default function Map() {
  const adjacent = useAppSelector(selectAdjacent).value;
  const countryFrom = useAppSelector(selectCountryFrom).value;
  const countryTo = useAppSelector(selectCountryTo).value;
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [zoom, SetZoom] = useState<number | undefined>(undefined);
  const [coords, SetCoords] = useState<number | undefined>(undefined);
  useEffect(() => {
    setHeight(window.innerHeight);
    switch (true) {
      case window.innerWidth <= 768:
        SetCoords(155);
        SetZoom(3);
        break;
      case window.innerWidth <= 1400:
        SetCoords(155);
        SetZoom(2);
        break;
      default:
        SetCoords(0);
        SetZoom(1.2);
        break;
    }
  }, []);

  function setColor(geoId: string): string {
    const saturation = 0.05;

    const adjacencyStep = adjacent.find((x) => x.geoName === geoId)?.step;
    if (geoId === countryFrom || geoId === countryTo) {
      return "#dedede";
    } else if (adjacencyStep !== undefined) {
      return `rgba(79, 104, 247, ${1 - saturation * adjacencyStep})`;
    }
    return "#fff";
  }

  return !height && !zoom && !coords ? (
    <div style={{ position: "absolute", marginLeft: "50%", marginTop: "30%" }}>
      <CircularProgress />
    </div>
  ) : (
    <div
      style={{ justifyContent: "center", display: "flex" }}
      data-testid="wrapper"
    >
      <div style={{ width: "100%", justifyContent: "center" }}>
        <ComposableMap
          data-testid="composableMap"
          style={{
            width: "100%",
            height: height,
            flexGrow: "1",
          }}
        >
          <ZoomableGroup center={[0, coords || 0]} zoom={zoom}>
            <Graticule stroke="#d1d1d1" />
            <Geographies geography={data} style={{ backgroundColor: "red" }}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    data-testid={geo.properties.name}
                    key={geo.rsmKey}
                    geography={geo}
                    stroke="black"
                    fill={setColor(geo.properties.name)}
                    strokeWidth={0.2}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
}
