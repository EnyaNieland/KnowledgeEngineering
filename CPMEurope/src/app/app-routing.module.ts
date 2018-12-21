import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { DatabaseComponent } from './database/database.component';
import { MachineDetailComponent } from './machines/machine-detail/machine-detail.component';
import { PartEditComponent } from './parts/part-edit/part-edit.component';

const routes: Routes = [
  { path: "database", component: DatabaseComponent, children: [
    { path: "machines", component: DatabaseComponent },
    { path: "machine/:id", component: MachineDetailComponent, outlet: "edit" },
    { path: "parts", component: DatabaseComponent },
    { path: "part/:id", component: PartEditComponent, outlet: "edit" },
  ] },
  { path: "create-tender", component: DatabaseComponent },
  { path: "", redirectTo: "/create-tender", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
