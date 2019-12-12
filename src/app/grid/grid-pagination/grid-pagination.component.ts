import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

interface PageItem {
  active: boolean;
}

@Component({
  selector: 'app-grid-pagination',
  templateUrl: './grid-pagination.component.html',
  styleUrls: ['./grid-pagination.component.styl'],
})
export class GridPaginationComponent implements OnChanges, OnInit {
  private _pages: PageItem[];

  @Input() currentPage: number;
  @Input() totalPages: number;

  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  private _getPages(): PageItem[] {
    return Array(this.totalPages).fill(undefined).map((e: unknown, index: number): PageItem => ({
      active: index === this.currentPage,
    }));
  }

  ngOnInit(): void {
    this._pages = this._getPages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { currentPage, totalPages } = changes;

    if (totalPages !== undefined && totalPages.previousValue !== totalPages.currentValue) {
      this._pages = this._getPages();
    }

    if (currentPage !== undefined && currentPage.previousValue !== currentPage.currentValue) {
      this._pages = this._getPages();
    }

  }
}
