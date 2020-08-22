import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CoreComponent} from '../../core/core.component';
import {subscribeOn} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends CoreComponent implements OnInit {

  @Output() authModeEvent = new EventEmitter();

  constructor() { super(); }

  ngOnInit(): void {
  }

  updateAuthMode(mode) {
    this.authModeEvent.emit(mode);
  }

}
