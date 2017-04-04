import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { AngularFireModule } from 'angularfire2';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DatabankComponent } from './databank.component';

import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ClarityModule.forChild(),
    NgxChartsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  declarations: [
    DatabankComponent
  ],
  exports: [
    DatabankComponent
  ]
})
export class DatabankModule { }
