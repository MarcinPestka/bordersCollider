import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { useAppSelector } from "../hooks";
import { selectCountryFrom, selectCountryTo, selectAdjecent, setAdjecent } from "../stores/countriesSlice";
import data from '../../public/features.json';


export default function Map() {
    const adjecent = useAppSelector(selectAdjecent).value

    function setColor(geoId: string) {
        switch (adjecent.find(x => x.geoName === geoId)?.step) {
            case 0:
                return '#81E366'
            case 1:
                return '#8AD866'
            case 2:
                return '#93CC66'
            case 3:
                return '#9CC166'
            case 4:
                return '#A5B666'
            case 5:
                return '#AEAA66'
            case 6:
                return '#B69F66'
            case 7:
                return '#BF9366'
            case 8:
                return '#C88866'
            case 9:
                return '#D17D66'
            case 10:
                return '#DA7166'
            case 11:
                return '#E36666'
            default:
                return '#fff'
        }
    }

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
    )
}

