import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { useAppSelector } from "../../store/hooks";
import { Country, PopulationData } from "../../../typedef";
import { scaleLinear } from "d3-scale";
import "../../modules/map/map.css";
import { useNavigate } from "react-router-dom";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

interface Props {
  setTooltipContent: (value: string) => void;
}

const MapChart = ({ setTooltipContent }: Props) => {
  const { countriesStats, populationCountries } = useAppSelector(
    (state) => state.stats
  );

  const navigate = useNavigate();

  return (
    <div className="map">
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const populationCountry: PopulationData | undefined =
                  populationCountries.find(
                    (el) => el.iso3 === geo.properties.ISO_A3
                  );
                const populationCount =
                  populationCountry?.populationCounts[
                    populationCountry?.populationCounts.length - 1
                  ];
                const country: Country | undefined = countriesStats?.find(
                  (el) => el.CountryCode === geo.properties.ISO_A2
                );
                const colorScale = scaleLinear<string>()
                  .domain([0, populationCount?.value || 0])
                  .range(["#020024", "#3E8EDE"]);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => navigate(`countries/${country?.Slug}`)}
                    fill={
                      country
                        ? colorScale(country["TotalConfirmed"])
                        : "#0C2340"
                    }
                    onMouseEnter={() => {
                      if (country) {
                        setTooltipContent(`${country?.Country}</br>
                        Total Confirmed: ${country?.TotalConfirmed}</br>
                        New Confirmed: ${country?.NewConfirmed}</br>
                        New Deaths: ${country?.NewDeaths}</br>
                        Total Deaths: ${country?.TotalDeaths}</br>`);
                      } else {
                        setTooltipContent("");
                      }
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      hover: {
                        fill: "#AFDBF5",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#AFDBF5",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
