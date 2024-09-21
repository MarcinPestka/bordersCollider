import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { useAppSelector } from "../hooks";
import { selectCountryFrom, selectCountryTo } from "../stores/countriesSlice";
import data from '../../public/features.json';


export default function Map() {
    const countryFrom = useAppSelector(selectCountryFrom).value
    const countryTo = useAppSelector(selectCountryTo).value

    return (
        <div style={{ justifyContent: 'center', display: 'flex' }} data-testid='wrapper'>
            <div style={{ width: '60%', justifyContent: 'center' }}>

                <ComposableMap data-testid='composableMap'>
                    <ZoomableGroup center={[0, 0]} zoom={1}>
                        <Geographies geography={data}>
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography
                                        data-testid={geo.properties.name}
                                        key={geo.rsmKey} geography={geo}
                                        stroke="black"
                                        fill={countryFrom === geo.properties.name ? 'red' : countryTo === geo.properties.name ? 'green' : 'white'}
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
    )
}

