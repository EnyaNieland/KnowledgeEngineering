import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

// services
import { MachineService } from '../machine.service';

// classes
import { Machine } from '../machine';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {
  title = "Machines";
  machines: Machine[];
  faPlusSquare = faPlusSquare;

  constructor(private machineService: MachineService, private router: Router) { }

  ngOnInit() {
    this.getMachines();
  }

  getMachines(): void {
    this.machineService.getMachines()
      .subscribe(machines => this.machines = machines);
  }
}
