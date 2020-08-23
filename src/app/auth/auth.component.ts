import { Component, OnInit } from '@angular/core';
import {CoreComponent} from '../core/core.component';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent extends CoreComponent implements OnInit {
  authMode = 'login';

  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
  }

  onSubmit(data) {
    if (this.authMode === 'register') {
      this.authService.register(data)
        .subscribe(result => {
          console.log(result);
        });
    }
  }

  setAuthMode(mode) {
    this.authMode = mode;
  }

}
