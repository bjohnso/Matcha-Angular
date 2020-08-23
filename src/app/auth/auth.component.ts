import { Component, OnInit } from '@angular/core';
import {CoreComponent} from '../core/core.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent extends CoreComponent implements OnInit {
  authMode = 'login';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  setAuthMode(mode) {
    this.authMode = mode;
  }

}
