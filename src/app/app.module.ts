import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {GridModule} from './grid/grid.module';
import {ProgressModule} from './progress/progress.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    ProgressModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
