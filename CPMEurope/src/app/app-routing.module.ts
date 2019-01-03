import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { DatabaseComponent } from './component/database/database.component';
import {RequestComponent} from "./component/request/request.component";
import {InputComponent} from "./component/request/input/input.component";
import {AssessmentComponent} from "./component/request/assessment/assessment.component";
import {OutputComponent} from "./component/request/output/output.component";
import {MachineComponent} from "./component/database/machines/machine.component";
import {PartComponent} from "./component/database/parts/part.component";
import {ProductsComponent} from "./component/database/products/products.component";

const routes: Routes = [
  { path: "database", component: DatabaseComponent, children: [
    { path: "machines", component: MachineComponent, outlet: "database" },
    { path: "parts", component: PartComponent, outlet: "database" },
    { path: "products", component: ProductsComponent, outlet: "database" }
  ] },
  { path: "request", component: RequestComponent, children: [
    { path: "input", component: InputComponent, outlet: "assessment" },
    { path: "assessment", component: AssessmentComponent, outlet: "assessment" },
    { path: "output", component: OutputComponent, outlet: "assessment" },
    { path: "", redirectTo: "/request/(assessment:input)", pathMatch: "full"}
  ] },
  { path: "", redirectTo: "/request", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
