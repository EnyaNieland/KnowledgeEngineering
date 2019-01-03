import { Component, OnInit } from '@angular/core';
import {AssessmentService} from "../../../service/assessment.service";
import {Tender} from "../../../class/tender";

@Component({
  selector: 'app-tenders',
  templateUrl: './tenders.component.html',
  styleUrls: ['./tenders.component.scss']
})
export class TendersComponent implements OnInit {
  tenders: Tender[];

  constructor(
    private assessmentService: AssessmentService
  ) { }

  ngOnInit() {
    this.tenders = this.assessmentService.tenders;
  }

}
