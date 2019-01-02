import {Part} from "./part";
import {Product} from "./product";

export class Machine {
  id: number;
  type: string;
  parts: Part[];
  productTypes: string[];
}
