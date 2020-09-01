import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CoreComponent} from '../../core/core.component';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends CoreComponent implements OnInit {

  @Output() authModeEvent = new EventEmitter();
  @Output() loginEvent = new EventEmitter();

  constructor() { super(); }

  ngOnInit(): void {
  }

  updateAuthMode(mode) {
    this.authModeEvent.emit(mode);
  }

  onSubmit(form: NgForm) {
    this.loginEvent.emit({
      password: form.value.password,
      email: form.value.email
    });
  }
}
