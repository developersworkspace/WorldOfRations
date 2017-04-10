import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, UrlSerializer } from '@angular/router';

import { LowerCaseUrlSerializer } from './lower-case-url-serializer';

// Plugins
import { TypeaheadModule } from 'ng2-bootstrap';
import { PositioningService } from 'ng2-bootstrap';
import { ComponentLoaderFactory } from 'ng2-bootstrap/component-loader';
import { SelectModule } from 'ng2-select';

// Components
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { FormulationComponent } from './formulation/formulation.component';
import { FormulatorComponent } from './formulator/formulator.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OwnFeedstuffEditComponent } from './own-feedstuff-edit/own-feedstuff-edit.component';
import { OwnFeedstuffsComponent } from './own-feedstuffs/own-feedstuffs.component';
import { TermsComponent } from './terms/terms.component';
import { TipsComponent } from './tips/tips.component';

// Services
import { FeedstuffService } from './services/feedstuff.service';
import { FormulaService } from './services/formula.service';
import { FormulatorService } from './services/formulator.service';
import { OwnFeedstuffsService } from './services/own-feedstuffs.service';

const router = RouterModule.forRoot([
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'formulator',
    component: FormulatorComponent,
  },
  {
    path: 'formulation',
    component: FormulationComponent,
  },
  {
    path: 'tips',
    component: TipsComponent,
  },
  {
    path: 'terms',
    component: TermsComponent,
  },
  {
    path: 'ownfeedstuffs',
    component: OwnFeedstuffsComponent,
  },
  {
    path: 'ownfeedstuffedit',
    component: OwnFeedstuffEditComponent,
  },
]);

@NgModule({
  declarations: [
    AppComponent,
    FormulatorComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    NavbarComponent,
    FormulationComponent,
    TipsComponent,
    TermsComponent,
    FooterComponent,
    OwnFeedstuffsComponent,
    OwnFeedstuffEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    router,
    SelectModule,
    TypeaheadModule,
  ],
  providers: [FeedstuffService,
    FormulaService,
    FormulatorService,
    ComponentLoaderFactory,
    PositioningService,
    OwnFeedstuffsService,
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer,
    },
  ],
  bootstrap: [AppComponent, NavbarComponent],
})
export class AppModule { }
