import { Component, OnInit } from '@angular/core';

// services
import { MachineService } from '../../../service/machine.service';

// classes
import { Machine } from '../../../class/machine';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {
  machines: Machine[];
  selectedMachine: Machine;

  constructor(
    private machineService: MachineService
  ) { }

  ngOnInit() {
    this.getMachines();
  }

  getMachines(): void {
    this.machineService.getMachines()
      .subscribe(machines => this.machines = machines);
  }

  onSelect(machine: Machine): void {
    this.selectedMachine = machine;
    $('#machine-modal').modal('show');
  }
}
