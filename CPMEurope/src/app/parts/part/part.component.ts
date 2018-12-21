import { Component, OnInit } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

// services
import { PartService } from '../part.service';

// classes
import { Part } from '../part';
import {patchComponentDefWithScope} from "@angular/core/src/render3/jit/module";

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartComponent implements OnInit {
  title = "Parts";
  parts: Part[];
  faPlusSquare = faPlusSquare;

  constructor(private partService: PartService) { }

  ngOnInit() {
    this.getParts();
  }

  getParts(): void {
    this.partService.getParts()
      .subscribe(parts => this.parts = parts);
  }
}
