import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";

import { DetailReducer } from "./DetailReducer";

// Configure Redux store & reducers
export const rootReducer = combineReducers({
  detail: DetailReducer
});

export * from "./DetailReducer";

export type IStore = StateType<typeof rootReducer>;
