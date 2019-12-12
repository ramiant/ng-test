import {Component, Input, OnDestroy} from '@angular/core';
import {GridData, GridHeaderModel} from '../data/grid.data.model';
import {sort} from '../utils/sort';
import {Observable, Subscription} from 'rxjs';

export interface GridSortModel<T> {
  sortProperty?: keyof T | null;
  reverse?: boolean;
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.styl'],
})
export class GridComponent<T> implements OnDestroy {
  private _subscriptions: Subscription[] = [];
  private _currentPage = 0;
  private _headers: Array<GridHeaderModel<T>>;
  private _order: Array<keyof T>;
  private _sort: GridSortModel<T> = {};
  private _records: Array<T>;
  private _totalRecords: number;

  @Input() sortable: boolean;
  @Input() pageSize: number | null;

  @Input() set data(data: GridData<T>) {
    if ((data.records as any).subscribe) {
      const _records: Observable<Array<T>> = data.records as Observable<Array<T>>;
      this._subscriptions.push(_records.subscribe((records: Array<T>): void => {
        this._records = records;
        this._totalRecords = records.length;
      }));
    } else {
      const _records: Array<T> = data.records as Array<T>;
      this._records = _records;
      this._totalRecords = _records.length;
    }

    this._headers = data.headers;
    this._order = data.headers.map((header: GridHeaderModel<T>) => header.id);
  }

  get currentPageSize(): number {
    return this.pageSize || this._totalRecords;
  }

  get totalPages(): number {
    return Math.ceil(this._totalRecords / this.currentPageSize);
  }

  get records(): Array<T> {
    const start: number = this._currentPage * this.currentPageSize;
    const end: number = start + this.currentPageSize;

    let records: Array<T> = this._records;

    if (!this.sortable) {
      return records.slice(start, end);
    }

    const { sortProperty, reverse } = this._sort;

    if (this._sort.sortProperty) {
      records = sort<T>(records, sortProperty, reverse);
    }

    return records.slice(start, end);
  }

  onPageSizeChanged(pageSize: number): void {
    this.pageSize = pageSize;
    this._currentPage = 0;
  }

  onPageChanged(page: number): void {
    this._currentPage = page;
  }

  onSort(property: keyof T): void {
    if (this._sort.sortProperty === property) {
      this._sort = {
        ...this._sort,
        reverse: !this._sort.reverse,
      };
      return;
    }
    this._sort = {
      ...this._sort,
      sortProperty: property,
      reverse: false,
    };
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
