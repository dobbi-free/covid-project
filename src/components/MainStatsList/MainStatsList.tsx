import React from "react";
import { SummaryStats } from "../../../typedef";

interface Props {
  summaryStats: SummaryStats;
}

export const MainStatsList = ({ summaryStats }: Props) => {
  return (
    <ul className="main-stats__list">
      <li className="main-stats__list-item">
        New Cases:
        <span className="main-stats__span cases-span">
          {summaryStats.NewConfirmed}
        </span>
      </li>
      <li className="main-stats__list-item">
        Confirmed:
        <span className="main-stats__span confirmed-span">
          {summaryStats.TotalConfirmed}
        </span>
      </li>
      <li className="main-stats__list-item">
        Deaths:
        <span className="main-stats__span deaths-span">
          {summaryStats.TotalDeaths}
        </span>
      </li>
      <li className="main-stats__list-item">
        Recovered:
        <span className="main-stats__span recovered-span">
          {summaryStats.TotalRecovered}
        </span>
      </li>
    </ul>
  );
};
