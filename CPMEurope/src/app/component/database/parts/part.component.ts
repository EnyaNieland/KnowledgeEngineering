import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

// services
import { PartService } from '../../../service/part.service';

// classes
import { Part } from '../../../class/part';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartComponent implements OnInit {
  title = "Parts";
  parts: Part[];
  selectedPart: Part;

  constructor(
    private partService: PartService
  ) { }

  ngOnInit() {
    this.getParts();
  }

  getParts(): void {
    this.partService.getParts()
      .subscribe(parts => this.parts = parts );
  }

  onSelect(part: Part): void {
    this.selectedPart = part;
    (<any>$('#part-modal')).modal('show');
  }
}
