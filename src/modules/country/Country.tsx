import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {
  fetchConfirmedStats,
  fetchDeathsStats,
  fetchRecoveredStats,
  fetchSummaryStats,
} from "../../store/action-creators/statsActionCreator";
import { Chart } from "react-google-charts";
import "./country.css";
import { Preloader } from "../../components/Preloader";

export const Country = () => {
  const { country } = useParams();
  const dispatch = useAppDispatch();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const {
    countryConfirmedStats,
    countryRecoveredStats,
    countryDeathsStats,
    isLoading,
  } = useAppSelector((state) => state.stats);

  const currentCountry = useAppSelector((state) =>
    state.stats.countriesStats.find((el) => el.Slug === country)
  );

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    const startFormat = moment(startDate).format("YYYY-MM-DD");
    const endFormat = moment(endDate).format("YYYY-MM-DD");
    if (country) {
      dispatch(
        fetchDeathsStats({ country, start: startFormat, end: endFormat })
      );
      dispatch(
        fetchConfirmedStats({ country, start: startFormat, end: endFormat })
      );
      dispatch(
        fetchRecoveredStats({ country, start: startFormat, end: endFormat })
      );
    }
    if (!currentCountry) {
      dispatch(fetchSummaryStats());
    }
  }, [startDate, endDate]);

  const lineDataMemo: (string | number)[][] = useMemo(() => {
    const LineData = [["Day", "Confirmed", "Recovered", "Deaths"]];
    if (countryConfirmedStats?.length) {
      const lines = countryConfirmedStats.map((el, i) => [
        i,
        countryConfirmedStats[i]?.Cases,
        countryRecoveredStats[i]?.Cases,
        countryDeathsStats[i]?.Cases,
      ]);
      return [...LineData, ...lines];
    } else {
      return [...LineData, [0, 0, 0, 0]];
    }
  }, [countryConfirmedStats, countryDeathsStats, countryRecoveredStats]);

  const LineChartOptions = {
    backgroundColor: "#4C516D",
    colors: ["#f25454", "#00ba80", "#fafafa"],
    lineWidth: 4,
    legendTextStyle: { color: "#FFF" },
    hAxis: {
      title: "Days",
      titleTextStyle: { color: "#fff", fontSize: "18" },
      textStyle: { color: "#fff", fontSize: "15" },
    },
    vAxis: {
      title: "Cases",
      titleTextStyle: { color: "#fff", fontSize: "18" },
      textStyle: { color: "#fff", fontSize: "15" },
    },
    series: {
      1: { curveType: "function" },
    },
  };

  return (
    <div className="country">
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <h2 className="country__name">{currentCountry?.Country}</h2>
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            dateFormat="yyyy-MM-dd"
            inline
          />
          <Chart
            width={"1200px"}
            height={"510px"}
            chartType="LineChart"
            data={lineDataMemo}
            options={LineChartOptions}
          />
        </>
      )}
    </div>
  );
};
