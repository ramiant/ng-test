import {Component} from '@angular/core';
import * as data from './data/grid.data.json';
import {GridData, GridDataModel} from './data/grid.data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  title = 'ui-test';

  gridData: GridData<GridDataModel> = (data as unknown as { default: GridData<GridDataModel> }).default;
}
