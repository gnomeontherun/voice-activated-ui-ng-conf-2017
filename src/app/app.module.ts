import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AngularFireModule } from 'angularfire2';

import { DatabankModule } from './databank/databank.module';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ClarityModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    DatabankModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
