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
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormulationComponent } from './formulation/formulation.component';
import {SelectModule} from 'ng2-select';

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
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'formulator',
    component: FormulatorComponent
  },
  {
    path: 'formulation',
    component: FormulationComponent
  },
]);


@NgModule({
  declarations: [
    AppComponent,
    FormulatorComponent,
    Typeahead,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    NavbarComponent,
    FormulationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    router,
    SelectModule
  ],
  providers: [FeedstuffService, FormulaService, FormulatorService],
  bootstrap: [AppComponent, NavbarComponent]
})
export class AppModule { }
