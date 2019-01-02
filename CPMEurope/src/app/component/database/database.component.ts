import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {
  title = "Database";
  routerlinks: object[] = [
    {name: "Machines", link: "machines"},
    {name: "Parts", link: "parts"}
  ];

  constructor() { }

  ngOnInit() {
  }

}
