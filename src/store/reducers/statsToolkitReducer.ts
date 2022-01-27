import { createReducer } from "@reduxjs/toolkit";
import {
  Country,
  CountryStatusStats,
  PopulationData,
  SummaryStats,
} from "../../../typedef";
import {
  fetchConfirmedStats,
  fetchDeathsStats,
  fetchPopulationCountries,
  fetchRecoveredStats,
  fetchSummaryStats,
} from "../action-creators/statsActionCreator";

type State = {
  summaryStats: SummaryStats;
  countriesStats: Country[];
  countryConfirmedStats: CountryStatusStats[];
  countryRecoveredStats: CountryStatusStats[];
  countryDeathsStats: CountryStatusStats[];
  populationCountries: PopulationData[];
  isLoading: boolean;
};

const initialState = {
  summaryStats: {} as SummaryStats,
  countriesStats: [],
  countryConfirmedStats: [],
  countryRecoveredStats: [],
  countryDeathsStats: [],
  populationCountries: [],
  isLoading: false,
} as State;

export const stats = createReducer(initialState, (builder) =>
  builder
    .addCase(fetchSummaryStats.fulfilled, (state, action) => {
      state.summaryStats = action.payload.Global;
      state.countriesStats = action.payload.Countries;
      state.isLoading = false;
    })
    .addCase(fetchSummaryStats.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(fetchDeathsStats.fulfilled, (state, action) => {
      state.countryDeathsStats = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchConfirmedStats.fulfilled, (state, action) => {
      state.countryConfirmedStats = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchRecoveredStats.fulfilled, (state, action) => {
      state.countryRecoveredStats = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchPopulationCountries.fulfilled, (state, action) => {
      state.populationCountries = action.payload;
    })
    .addCase(fetchConfirmedStats.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(fetchRecoveredStats.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(fetchDeathsStats.pending, (state, action) => {
      state.isLoading = true;
    })
);
