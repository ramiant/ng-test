import {Component, EventEmitter, Input, Output} from '@angular/core';

const defaultDistribution: Array<number | null> = [null, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];

@Component({
  selector: 'app-grid-page-selector',
  templateUrl: './grid-page-selector.component.html',
})
export class GridPageSelectorComponent {
  @Input() totalRecords: number;
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter<number>();

  get range(): Array<number | null> {
    return [...defaultDistribution.filter((e: number) => e < this.totalRecords), this.totalRecords];
  }

  onPageSizeChange(event: Event) {
    const value = (event.target as HTMLOptionElement).value as string;

    if (value !== 'null') {
      this.pageSizeChange.emit(parseInt(value, 0));
    }
  }
}
