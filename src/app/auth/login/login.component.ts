import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CoreComponent} from '../../core/core.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends CoreComponent implements OnInit {

  @Output() authModeEvent = new EventEmitter();

  constructor() { super(); }

  ngOnInit(): void {
  }

  updateAuthMode(mode) {
    this.authModeEvent.emit(mode);
  }

}
