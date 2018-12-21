import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { MachineComponent } from './machines/machine/machine.component';
import { MachineDetailComponent } from './machines/machine-detail/machine-detail.component';
import { MessageComponent } from './messages/message/message.component';
import { UiModule } from './ui/ui.module';
import { DatabaseComponent } from './database/database.component';
import { PartComponent } from './parts/part/part.component';
import { PartEditComponent } from './parts/part-edit/part-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MachineComponent,
    MachineDetailComponent,
    MessageComponent,
    DatabaseComponent,
    PartComponent,
    PartEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    UiModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
