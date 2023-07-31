import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import { RootReducerState, getCategoryError, getCategoryLoaded, getCategoryLoading, getCategorys } from '../reducers';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { CategoryMasterModel } from 'src/app/_models/category';
import { Observable, combineLatest, take } from 'rxjs';
import { CategoryListErrorAction, CategoryListRequestAction, CategoryListSuccessAction } from '../actions/category-action';

@Injectable()
export class CategoryRepository {
  masterName?: any;
  constructor(private store: Store<RootReducerState>, private apiService: ApiService) {
  }

  getCategoryList(force = false): [Observable<boolean>, Observable<CategoryMasterModel[]>, Observable<boolean>] {
    const loading$ = this.store.select(getCategoryLoading);
    const loaded$ = this.store.select(getCategoryLoaded);
    const CategoryData$ = this.store.select(getCategorys);
    const getError$ = this.store.select(getCategoryError);
    combineLatest([loaded$, loading$]).pipe(take(1)).subscribe((data) => {
      if ((!data[0] && !data[1]) || force) {
        this.store.dispatch(new CategoryListRequestAction());
        this.masterName = "/category";
        this.apiService.getAll(this.masterName).subscribe(res => {
          this.store.dispatch(new CategoryListSuccessAction({data: res}));
        }, error => {
          this.store.dispatch(new CategoryListErrorAction());
        });
      }
    });
    return [loading$, CategoryData$, getError$];
  }
}
