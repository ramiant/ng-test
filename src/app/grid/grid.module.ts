import {NgModule} from '@angular/core';
import {GridComponent} from './grid.component';
import {GridItemComponent} from './grid-item/grid-item.component';
import {GridPaginationComponent} from './grid-pagination/grid-pagination.component';
import {BrowserModule} from '@angular/platform-browser';
import {GridHeaderComponent} from './grid-header/grid-header.component';
import {GridPageSelectorComponent} from './grid-page-selector/grid-page-selector.component';

@NgModule({
  declarations: [
    GridComponent,
    GridItemComponent,
    GridPaginationComponent,
    GridHeaderComponent,
    GridPageSelectorComponent,
  ],
  exports: [
    GridComponent,
  ],
  imports: [
    BrowserModule,
  ],
})
export class GridModule {  }
