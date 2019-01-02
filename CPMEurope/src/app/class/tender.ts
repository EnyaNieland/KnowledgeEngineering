import { Machine } from "./machine";

export class Tender {
  id: number;
  machine: Machine;
  totalCost: number;
  fullDescription: string[];
}
