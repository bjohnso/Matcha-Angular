import { Component, OnInit } from '@angular/core';
import {CoreComponent} from '../core/core.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends CoreComponent implements OnInit {

  constructor() { super(); }

  ngOnInit(): void {
  }

}
