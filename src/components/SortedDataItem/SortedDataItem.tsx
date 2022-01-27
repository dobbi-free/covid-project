import React from "react";
import { Country } from "../../../typedef";

interface Props {
  country: Country;
}

export const SortedDataItem = ({ country }: Props) => {
  return (
    <div key={country.CountryCode} className="sorted-stats__country">
      <div className="sorted-stats__item">{country.Country}</div>
      <div className="sorted-stats__item cases-span">
        {country.TotalConfirmed}
      </div>
      <div className="sorted-stats__item deaths-span">
        {country.TotalDeaths}
      </div>
      <div className="sorted-stats__item recovered-span">
        {country.TotalRecovered}
      </div>
    </div>
  );
};
