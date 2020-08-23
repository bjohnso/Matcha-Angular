import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CoreComponent} from '../../core/core.component';
import {subscribeOn} from 'rxjs/operators';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends CoreComponent implements OnInit {

  @Output() authModeEvent = new EventEmitter();
  @Output() registerEvent = new EventEmitter();

  constructor() { super(); }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.registerEvent.emit({
      username: form.value.username,
      password: form.value.password,
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      email: form.value.email
    });
  }

  updateAuthMode(mode) {
    this.authModeEvent.emit(mode);
  }

}
