import React, { useEffect } from "react";
import { MainStats } from "../main-stats";
import { Map } from "../map";
import { SortedStats } from "../sorted-stats";
import "./mainView.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchPopulationCountries,
  fetchSummaryStats,
} from "../../store/action-creators/statsActionCreator";
import { Preloader } from "../../components/Preloader";

export const MainView = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPopulationCountries());
    dispatch(fetchSummaryStats());
  }, []);
  const { isLoading } = useAppSelector((state) => state.stats);
  return (
    <div className="wrapper">
      <div className="stats__wrapper">
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <MainStats />
            <SortedStats />
          </>
        )}
      </div>
      <Map />
    </div>
  );
};
