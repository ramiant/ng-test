import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.styl'],
})
export class GridItemComponent<T> {
  @Input() data: T;
  @Input() order: Array<keyof T>;
}
