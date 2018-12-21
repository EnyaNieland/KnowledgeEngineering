import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from "@angular/forms";

import { Machine } from '../machine';
import { Part } from '../../parts/part';

import { MachineService }  from '../machine.service';
import { PartService } from '../../parts/part.service';

@Component({
  selector: 'app-machine-detail',
  templateUrl: './machine-detail.component.html',
  styleUrls: ['./machine-detail.component.scss']
})
export class MachineDetailComponent implements OnInit {
  machine: Machine;
  // containedParts: Part[] = this.machine.parts;
  parts: Part[];
  machineForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private machineService: MachineService,
    private partService: PartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      var id = params.get("id");
      this.getMachine(id);
    });
    this.getParts();
  }

  getMachine(id): void {
    this.machineService.getMachine(id)
      .subscribe(machine => this.machine = machine);
  }

  getParts() {
    this.partService.getParts()
      .subscribe(parts => this.parts = parts);
  }

  save(): void {
    this.machineService.updateMachine(this.machine)
      .subscribe(() => this.router.navigate(['database']));
    console.log(this.machine)
  }
}
// this.router.navigate([{ outlets: { edit: null }}]);
