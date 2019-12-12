import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GridHeaderModel} from '../../data/grid.data.model';
import {GridSortModel} from '../grid.component';

@Component({
  selector: 'app-grid-header',
  templateUrl: './grid-header.component.html',
  styleUrls: ['./grid-header.component.styl'],
})
export class GridHeaderComponent<T> {
  @Input() data: Array<GridHeaderModel<T>>;
  @Input() order: Array<keyof T>;
  @Input() gridSort?: GridSortModel<T>;
  @Output() sort: EventEmitter<keyof T> = new EventEmitter<keyof T>();

  sortBy(sortProperty: string) {
    this.sort.emit(sortProperty as keyof T);
  }
}
