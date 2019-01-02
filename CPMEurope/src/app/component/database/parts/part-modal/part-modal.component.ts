import {Component, Input, OnInit} from '@angular/core';
import {Part} from "../../../../class/part";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-part-modal',
  templateUrl: './part-modal.component.html',
  styleUrls: ['./part-modal.component.scss']
})
export class PartModalComponent implements OnInit {
  @Input() part: Part;

  partForm = new FormGroup({
    type: new FormControl(''),
    size: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

}
