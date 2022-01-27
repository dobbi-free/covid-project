import React, { useEffect, useMemo, useState } from "react";
import "./sortedStats.css";
import { useAppSelector } from "../../store/hooks";
import { Country } from "../../../typedef";
import { HiOutlineSortAscending } from "react-icons/all";
import { SearchCountry } from "./SearchCountry";
import { SortedDataItem } from "../../components/SortedDataItem";

export const SortedStats = () => {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedStats] = useState([] as Country[]);
  const [isAsc, setIsAsc] = useState(true);
  const [sortedKey, setSortedKey] = useState("");
  const [clearInput, setClearInput] = useState(false);

  const { countriesStats } = useAppSelector((state) => state.stats);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const newSortedData = countriesStats
      .filter((el) =>
        el.Country.toLowerCase().startsWith(e.target.value.toLowerCase())
      )
      .slice(0, 5);
    setSortedStats(newSortedData);
  };

  const onSortedStats = (key: string) => {
    const newSortedData: Country[] = [...countriesStats];
    if (isAsc) {
      newSortedData.sort(
        (a, b) =>
          Number(a[key as keyof Country]) - Number(b[key as keyof Country])
      );
      setSortedStats(newSortedData.slice(0, 5));
    } else {
      newSortedData.sort(
        (a, b) =>
          Number(b[key as keyof Country]) - Number(a[key as keyof Country])
      );
      setSortedStats(newSortedData.slice(0, 5));
    }
    setIsAsc(!isAsc);
    setSortedKey(key);
  };

  useEffect(() => {
    const newSortedData = [...countriesStats];
    newSortedData.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
    setSortedStats(newSortedData.slice(0, 5));
    setIsAsc(true);
    setSortedKey("TotalConfirmed");
  }, [countriesStats, clearInput]);

  const searchCountry = useMemo(
    () => (
      <SearchCountry
        search={search}
        onChangeSearch={onChangeSearch}
        setSearch={setSearch}
        setClearInput={setClearInput}
        clearInput={clearInput}
      />
    ),
    [search, clearInput]
  );

  return (
    <div className="sorted-stats">
      {searchCountry}
      <div className="sorted-stats__info">
        <div className="sorted-stats__titles">
          <div className="sorted-stats__item">Country</div>
          <div
            className="sorted-stats__item on-click-item"
            onClick={() => onSortedStats("TotalConfirmed")}
          >
            Confirmed
            {"TotalConfirmed" === sortedKey && (
              <HiOutlineSortAscending
                className={isAsc ? "asc-icon" : "asc-icon-rev"}
              />
            )}
          </div>
          <div
            className="sorted-stats__item on-click-item"
            onClick={() => onSortedStats("TotalDeaths")}
          >
            Deaths
            {"TotalDeaths" === sortedKey && (
              <HiOutlineSortAscending
                className={isAsc ? "asc-icon" : "asc-icon-rev"}
              />
            )}
          </div>
          <div
            className="sorted-stats__item on-click-item"
            onClick={() => onSortedStats("TotalRecovered")}
          >
            Recovered
            {"TotalRecovered" === sortedKey && (
              <HiOutlineSortAscending
                className={isAsc ? "asc-icon" : "asc-icon-rev"}
              />
            )}
          </div>
        </div>
        {sortedData.map((country) => (
          <SortedDataItem key={country.Country} country={country} />
        ))}
        {!sortedData.length && (
          <div className="sorted-stats__country">
            <div className="sorted-stats__item deaths-span">
              No matches exists
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
