import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import data from "../../features.json";
import { useAppSelector } from "../hooks";
import { store } from "../root";
import { selectCountryFrom, selectCountryTo } from "../stores/countriesSlice";

export default function Map() {
  const countryFrom = useAppSelector(selectCountryFrom).value;
  const countryTo = useAppSelector(selectCountryTo).value;
  const [height, setHeight] = useState(200);
  const [zoom, SetZoom] = useState(2);
  const [coords, SetCoords] = useState(0);
  useEffect(() => {
    setHeight(
      window.innerHeight -
        (document.getElementById("test")?.clientHeight || 210)
    );
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

    const adjacencyStep = store
      .getState()
      .adjacent.value.find((x) => x.geoName === geoId)?.step;
    if (geoId === countryFrom || geoId === countryTo) {
      return "#dedede";
    } else if (adjacencyStep !== undefined) {
      return `rgba(79, 104, 247, ${1 - saturation * adjacencyStep})`;
    }
    return "#fff";
  }

  return (
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
          <ZoomableGroup center={[0, coords]} zoom={zoom}>
            <Geographies geography={data}>
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
