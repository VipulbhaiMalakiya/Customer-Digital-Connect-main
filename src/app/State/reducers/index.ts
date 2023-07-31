import * as fromCategory from './category-reducer';
import {ActionReducerMap, createSelector} from '@ngrx/store';


export interface RootReducerState {
  category: fromCategory.CategoryReducerState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  category: fromCategory.CategoryReducer,

};

export const getCategoryState = (state: RootReducerState) => state.category;

export const getCategoryLoaded = createSelector(getCategoryState, fromCategory.getLoaded);
export const getCategoryLoading = createSelector(getCategoryState, fromCategory.getLoading);
export const getCategoryEntities = createSelector(getCategoryState, fromCategory.getEntities);
export const getCategorys = createSelector(getCategoryState, fromCategory.getCategory);
export const getCategoryError = createSelector(getCategoryState, fromCategory.getError);

export const getCategoryById = (state: RootReducerState, id: number) => {
  const entities = getCategoryEntities(state);
  return entities[id];
};



