import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import data from "../../public/features.json";
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
  const [height, setHeight] = useState(200);
  const [zoom, SetZoom] = useState(2);
  const [coords, SetCoords] = useState(0);
  useEffect(() => {
    setHeight(window.innerHeight - 210);
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

  function setColor(geoId: string) {
    if (geoId === countryFrom || geoId === countryTo) {
      return "#dedede";
    }
    switch (adjacent.find((x) => x.geoName === geoId)?.step) {
      case 0:
        return "#524DFF";
      case 1:
        return "#5651FF";
      case 2:
        return "#5A56FF";
      case 3:
        return "#5F5AFF";
      case 4:
        return "#635EFF";
      case 5:
        return "#6762FF";
      case 6:
        return "#6B67FF";
      case 7:
        return "#6F6BFF";
      case 8:
        return "#736FFF";
      case 9:
        return "#7873FF";
      case 10:
        return "#7C78FF";
      case 11:
        return "#807CFF";
      case 12:
        return "#8581FF";
      case 13:
        return "#8A86FF";
      case 14:
        return "#8F8CFF";
      case 15:
        return "#9491FF";
      case 16:
        return "#9996FF";
      case 17:
        return "#9F9BFF";
      case 18:
        return "#A4A0FF";
      case 19:
        return "#A9A5FF";
      case 20:
        return "#AEABFF";
      case 21:
        return "#B3B0FF";
      case 22:
        return "#B8B5FF";
      default:
        return "#fff";
    }
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
