import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { AssessmentService } from "../../../service/assessment.service";

import { Machine } from "../../../class/machine";

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {
  machines: Machine[];
  normsForm = new FormGroup({
    machine: new FormControl('')
  });

  constructor(
    private assessmentService: AssessmentService,
    private router: Router
  ) { }

  ngOnInit() {
    this.machines = this.assessmentService.norms;
  }

  onSubmit(event) {
    this.assessmentService.select(this.normsForm.value.machine);
    this.router.navigate(['/request', { outlets: { assessment: 'output'} }]);
  }
}
