import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AssessmentService } from "../../service/assessment.service";
import { MachineService } from "../../service/machine.service";

import { Machine } from "../../class/machine";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  title: string = "Request Tender";
  currentStep: number;
  totalSteps: number;
  progressPercentage: number;
  machines: Machine[];

  constructor(
    private assessmentService: AssessmentService,
    private machineService: MachineService,
    private router: Router
  ) { }

  ngOnInit() {
    this.machineService.getMachines()
      .subscribe(machines => this.machines = machines);

    if(this.assessmentService.tender) {
      this.router.navigate(['/request', { outlets: { assessment: 'output'} }]);
    } else {
      this.router.navigate(['/request', { outlets: { assessment: 'input'} }]);
    }
  }
}
