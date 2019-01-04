import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './service/in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { MachineComponent } from './component/database/machines/machine.component';
import { MessageComponent } from './component/database/messages/message.component';
import { UiModule } from './component/ui/ui.module';
import { DatabaseComponent } from './component/database/database.component';
import { PartComponent } from './component/database/parts/part.component';
import { RequestComponent } from './component/request/request.component';
import { InputComponent } from './component/request/input/input.component';
import { AssessmentComponent } from './component/request/assessment/assessment.component';
import { OutputComponent } from './component/request/output/output.component';
import { ProductsComponent } from './component/database/products/products.component';
import { TendersComponent } from './component/database/tenders/tenders.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UiModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService
    )
  ],
  declarations: [
    AppComponent,
    MachineComponent,
    MessageComponent,
    DatabaseComponent,
    PartComponent,
    RequestComponent,
    InputComponent,
    AssessmentComponent,
    OutputComponent,
    ProductsComponent,
    TendersComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
