import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./user.reducer";

export const getUserState = createFeatureSelector<State>('user');

export const getUserList = createSelector(getUserState, (state: State) => state.users);

export const getUserLoading = createSelector(getUserState, (state: State) => state.loading);
