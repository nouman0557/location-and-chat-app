import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-component',
  templateUrl: './angular-component.component.html',
  styleUrls: ['./angular-component.component.scss']
})
export class AngularComponentComponent implements OnInit {

  title = "Location and chat app"
  constructor() { }

  ngOnInit(): void {
  }

}
