import { CategoryMasterModel } from 'src/app/_models/category';
import {Action} from '../actions';
import { CATEGORY_ADD, CATEGORY_DELETE, CATEGORY_LIST_ERROR, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_UPDATE } from '../actions/category-action';
import {StoreUtility} from '../utils/store-utility';
import {createSelector} from '@ngrx/store';

export interface CategoryReducerState {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  entities: { [categoryId: number]: CategoryMasterModel };
  ids: number[];
}

const initialState: CategoryReducerState = {
  loaded: false,
  loading: false,
  error: false,
  entities: {},
  ids: []
};

export function CategoryReducer(state = initialState, action: Action): CategoryReducerState {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST: {
      return {...state, loading: true};
    }
    case CATEGORY_DELETE: {
      const categoryId = action.payload.categoryId;
      const newIds = state.ids.filter(elem => elem !== categoryId);
      const newEntities = StoreUtility.removeKey(state.entities, categoryId);
      return {...state, ...{entities: newEntities, ids: newIds}};
    }
    case CATEGORY_UPDATE: {
      const user = action.payload.data;
      const entity = {[user.categoryId]: user};
      const updatedEntities = {...state.entities, ...entity};
      return {...state, ...{entities: updatedEntities}};
    }
    case CATEGORY_ADD: {
      const user = action.payload.data;
      const entity = {[user.categoryId]: user};
      const newEntities = {...state.entities, ...entity};
      const newIds = StoreUtility.filterDuplicateIds([...state.ids, user.categoryId]);
      return {...state, ...{entities: newEntities, ids: newIds}};

    }
    case CATEGORY_LIST_ERROR: {
      return {...state, error: true, loading: false};
    }
    case CATEGORY_LIST_SUCCESS: {
      const users = action.payload.data;
      const obj = StoreUtility.normalize(users);
      const newEntities = {...state.entities, ...obj};
      const ids = users.map((user: { categoryId: any; }) => user.categoryId);
      const newIds = StoreUtility.filterDuplicateIds([...state.ids, ...ids]);
      return {
        ...state, ...{
          loaded: true,
          loading: false, error: false,
          entities: newEntities, ids: newIds
        }
      };
    }
    default: {
      return state;
    }
  }
}

// selectors
export const getLoading = (state: CategoryReducerState) => state.loading;
export const getLoaded = (state: CategoryReducerState) => state.loaded;
export const getEntities = (state: CategoryReducerState) => state.entities;
export const getIds = (state: CategoryReducerState) => state.ids;
export const getCategory = createSelector(getEntities,
  (entities) => StoreUtility.unNormalized(entities));
export const getError = (state: CategoryReducerState) => state.error;

