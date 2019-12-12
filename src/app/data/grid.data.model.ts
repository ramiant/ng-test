import {Observable} from 'rxjs';

export interface GridDataModel {
  name: string;
  age: number;
}

export interface GridHeaderModel<T> {
  id: keyof T;
  title: string;
  sortable: boolean;
}

export type GridRecordsType<T> = Array<T> | Observable<Array<T>>;

export interface GridData<T> {
  readonly records: GridRecordsType<T>;
  readonly headers: Array<GridHeaderModel<T>>;
}


