import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Plugins
import { Typeahead } from 'ng2-typeahead';

// Components
import { AppComponent } from './app.component';
import { FormulatorComponent } from './formulator/formulator.component';
import { HomeComponent } from './home/home.component';

// Services
import { FeedstuffService } from './services/feedstuff.service';
import { FormulaService } from './services/formula.service';
import { FormulatorService } from './services/formulator.service';


var router = RouterModule.forRoot([
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'formulator',
    component: FormulatorComponent
  }
]);


@NgModule({
  declarations: [
    AppComponent,
    FormulatorComponent,
    Typeahead,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    router
  ],
  providers: [FeedstuffService, FormulaService, FormulatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
