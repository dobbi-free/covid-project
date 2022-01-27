import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchOptions } from "../../../typedef";

export const fetchSummaryStats = createAsyncThunk("fetchSummary", async () => {
  return await fetch("https://api.covid19api.com/summary").then((res) =>
    res.json()
  );
});

export const fetchPopulationCountries = createAsyncThunk(
  "fetchCountriesPopulations",
  async () => {
    const { data } = await fetch(
      "https://countriesnow.space/api/v0.1/countries/population"
    ).then((res) => res.json());
    return data;
  }
);

// export const fetchCountryStats = createAsyncThunk(
//   "fetchCountryStats",
//   async (options: FetchOptions) => {
//     const confirmed = await fetch(
//       `https://api.covid19api.com/country/${options.country}/status/confirmed?from=${options.start}&to=${options.end}`
//     ).then((res) => res.json());
//     const recovered = await fetch(
//       `https://api.covid19api.com/country/${options.country}/status/recovered?from=${options.start}&to=${options.end}`
//     ).then((res) => res.json());
//     const deaths = await fetch(
//       `https://api.covid19api.com/country/${options.country}/status/deaths?from=${options.start}&to=${options.end}`
//     ).then((res) => res.json());
//     return { confirmed, recovered, deaths };
//   }
// );

export const fetchRecoveredStats = createAsyncThunk(
  "fetchRecoveredStats",
  async (options: FetchOptions) => {
    return await fetch(
      `https://api.covid19api.com/country/${options.country}/status/recovered?from=${options.start}&to=${options.end}`
    ).then((res) => res.json());
  }
);

export const fetchDeathsStats = createAsyncThunk(
  "fetchDeathsStats",
  async (options: FetchOptions) => {
    return await fetch(
      `https://api.covid19api.com/country/${options.country}/status/deaths?from=${options.start}&to=${options.end}`
    ).then((res) => res.json());
  }
);

export const fetchConfirmedStats = createAsyncThunk(
  "fetchConfirmedStats",
  async (options: FetchOptions) => {
    return await fetch(
      `https://api.covid19api.com/country/${options.country}/status/confirmed?from=${options.start}&to=${options.end}`
    ).then((res) => res.json());
  }
);
