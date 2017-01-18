import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Typeahead } from 'ng2-typeahead';

import { AppComponent } from './app.component';
import { FormulatorComponent } from './formulator/formulator.component';

@NgModule({
  declarations: [
    AppComponent,
    FormulatorComponent,
    Typeahead
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
