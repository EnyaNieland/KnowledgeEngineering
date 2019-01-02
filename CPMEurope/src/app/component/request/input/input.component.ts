import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from "@angular/router";

import { Machine } from "../../../class/machine";

import { MachineService } from "../../../service/machine.service";
import { AssessmentService } from "../../../service/assessment.service";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  title: string = "Input";
  productTypes: string[] = [ "oil-seed", "feed", "biomass" ];
  productCapacities: string[] = ["large", "medium", "small"];
  productSizes: string[] = ["large", "medium", "small"];

  machines: Machine[]
  inputForm = new FormGroup({
    productType: new FormControl(''),
    productCapacity: new FormControl(''),
    productSize: new FormControl('')
  });

  constructor(
    private assessmentService: AssessmentService,
    private machineService: MachineService,
    private router: Router
  ) { }

  ngOnInit() {
    this.machineService.getMachines()
      .subscribe(machines => this.machines = machines);
  }

  onSubmit() {
    this.assessmentService.startAssessment(this.inputForm.value);
    this.router.navigate(['/request', { outlets: { assessment: 'assessment'} }]);
  }
}
