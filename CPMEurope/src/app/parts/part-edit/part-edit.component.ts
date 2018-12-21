import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Part } from '../part';
import { switchMap } from "rxjs/operators"

import { PartService }  from '../part.service';

@Component({
  selector: 'app-part-edit',
  templateUrl: './part-edit.component.html',
  styleUrls: ['./part-edit.component.scss']
})
export class PartEditComponent implements OnInit {
  part: Part;

  constructor(
    private route: ActivatedRoute,
    private partService: PartService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      this.getPart(id);
    });
  }

  getPart(id): void {
    this.partService.getPart(id)
      .subscribe(part => this.part = part);
  }
}
// this.router.navigate([{ outlets: { edit: null }}]);
