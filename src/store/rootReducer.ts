import { combineReducers } from "@reduxjs/toolkit";
import { stats } from "./reducers/statsToolkitReducer";

export const rootReducer = combineReducers({
  stats,
});
