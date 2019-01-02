import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

import { AssessmentService } from "../../../service/assessment.service";

import { Tender } from "../../../class/tender";

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {
  tender: Tender;

  constructor(
    private assessmentService: AssessmentService,
    private router: Router
  ) { }

  ngOnInit() {
    this.tender = this.assessmentService.tender;
  }

  createPDF(machineType: string) {
    var data = document.getElementById('tender');
    html2canvas(data).then(canvas => {
      var position = 20;
      var imgWidth = 208 - 2 * position;
      var pageHeight = 295 - 2 * position;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      pdf.addImage(contentDataURL, 'PNG', position, position, imgWidth, imgHeight)
      pdf.save('tender-' + machineType + '.pdf'); // Generated PDF
    });
  }

  submitEvaluation(success: boolean) {
    if(success) {
      if(this.assessmentService.evaluate()){
        this.createPDF(this.tender.machine.type);
      } else {
        this.router.navigate(['/request', { outlets: { assessment: 'input'} }]);
      }
    } else {
      this.router.navigate(['/request', { outlets: { assessment: 'input'} }])
    }
  }
}
