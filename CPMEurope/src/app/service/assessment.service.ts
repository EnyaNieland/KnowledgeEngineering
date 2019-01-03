import { Injectable } from '@angular/core';

import { Part } from "../class/part";
import { Machine } from "../class/machine";
import { Tender } from "../class/tender";

import { PartService } from "./part.service";
import { MachineService } from "./machine.service";

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  machines: Machine[];
  parts: Part[];
  tender: Tender;
  tenders: Tender[] = [];

  abstractedCase: Machine[];
  norms: Machine[];

  partSize: string;

  constructor(
    private partService: PartService,
    private machineService: MachineService
  ) {
    this.machineService.getMachines()
      .subscribe(machines => this.machines = machines);
    this.partService.getParts()
      .subscribe(parts => this.parts = parts);
  }

  async startAssessment(input) {
    this.abstractedCase = <Machine[]>await this.abstract(input.productType);
    this.norms = <Machine[]>await this.specify(input.productSize, input.productCapacity);
  }

  abstract(productType: string) {
    //  use rule type machine-type to translate the product type to a list of machines.

    var filteredMachines: Machine[];

    switch(productType){
      case "oil-seed":
        // {"Pellet Mill","Hammer Mill", "Roller Mill", "Feeder and Conditioner"}
        filteredMachines = this.machines.filter(item => item.productTypes.indexOf('oil-seed') > -1);
        break;
      case "feed":
        // {"Pellet Mill","Heat treatment", "Hammer Mill", "Feeder and Conditioner","Crusher", "Roller Mill"}
        filteredMachines = this.machines.filter(item => item.productTypes.indexOf('feed') > -1);
        break;
      case "biomass":
        // {"Pellet Mill","Hammer Mill", "Roller Mill", "Feeder and Conditioner"}
        filteredMachines = this.machines.filter(item => item.productTypes.indexOf('biomass') > -1);
        break;
      default:
        // TODO: send error message
        break;
    }

    return new Promise(resolve => {
        resolve(filteredMachines);
    });
  }

  specify(productSize: string, productCapacity: string) {
    // use rule types product-size and product-capacity to create norms.
    // the norms consists of a list of machines that contain the correct parts.

    switch(productSize){
      case "small":
        if(productCapacity === "large") {
          this.partSize = "medium";
        } else {
          this.partSize = "small";
        }
        break;
      case "medium":
        this.partSize = "medium";
        break;
      case "large":
        if(productCapacity === "small") {
          this.partSize = "medium";
        } else {
          this.partSize = "large";
        }
        break;
      default:
        // TODO: send error message if no other case applies.
        break;
    }

    var filteredMachines = this.abstractedCase.map(machine => {
      return {
        id: machine.id,
        type: machine.type,
        parts: machine.parts.filter(part => part.size === this.partSize),
        productType: machine.productTypes
      }
    }).filter(machine => machine.parts.length > 0);

    return new Promise(resolve => {
      resolve(filteredMachines);
    });
  }

  select(chosenMachine: Machine) {
    this.tender = null;

    var id = this.tenders.length + 1;
    var totalCosts = chosenMachine.parts.map(part => part.price).reduce((prev, next) => prev + next);
    var fullDescription = chosenMachine.parts.map(part => part.description);

    // create the tender elements
    this.tender = {
      id: id,
      machine: chosenMachine,
      totalCost: totalCosts,
      fullDescription: fullDescription
    };

    this.tenders.push(this.tender);
  }

  evaluate() {
    // use the rule types increase rule to evaluate the tender

    if(this.tender.totalCost > 0) {
      this.tender = undefined;
      return true;
    }
    else {
      return false;
    }
  }

  match() {
    // match the product size and product capacity to the created tender.

    var parts = this.tender.machine.parts;

    parts.forEach(part => function() {
      if(part.size !== this.partSize) {
        return false;
      }
      else {
        return true;
      }
    })
  }
}
