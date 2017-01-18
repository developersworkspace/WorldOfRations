import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Plugins
import { Typeahead } from 'ng2-typeahead';

// Components
import { AppComponent } from './app.component';
import { FormulatorComponent } from './formulator/formulator.component';

// Services
import { FeedstuffService } from './services/feedstuff.service';

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
  providers: [FeedstuffService],
  bootstrap: [AppComponent]
})
export class AppModule { }
