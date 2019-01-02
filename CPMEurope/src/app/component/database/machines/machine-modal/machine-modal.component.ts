import { Component, Input, OnInit } from '@angular/core';
import { Machine } from "../../../../class/machine";
import { FormControl, FormGroup } from "@angular/forms";
import {MachineService} from "../../../../service/machine.service";
import {PartService} from "../../../../service/part.service";
import {Part} from "../../../../class/part";

@Component({
  selector: 'app-machine-modal',
  templateUrl: './machine-modal.component.html',
  styleUrls: ['./machine-modal.component.scss']
})
export class MachineModalComponent implements OnInit {
  @Input() machine: Machine;
  parts: Part[];

  machineForm = new FormGroup({
    type: new FormControl({value: 'n/a', disabled: true}, { updateOn: 'submit' }),
    parts: new FormControl(''),
    products: new FormControl('')
  });

  constructor(
    private machineService: MachineService,
    private partService: PartService
  ) { }

  ngOnInit() {
    this.partService.getParts()
      .subscribe(parts => this.parts = parts);
  }

  onSubmit() {
    console.log(this.machineForm.value, this.machine);
    this.machineService.updateMachine(this.machine)
      .subscribe(() => $('#machine-modal').modal('hide'));
  }
}
