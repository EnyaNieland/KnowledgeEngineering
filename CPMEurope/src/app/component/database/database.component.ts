import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {
  title = "Database";
  clicked: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  Clicked() {
    this.clicked = true;
  }

  navigate(url: string) {
     this.router.navigate(['/database', { outlets: { database: url} }])
  }

}
