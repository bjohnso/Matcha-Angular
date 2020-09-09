import { Component, OnInit } from '@angular/core';
import {CoreComponent} from '../core/core.component';
import {AuthService} from './services/auth.service';
import {JWTTokenService} from '../services/jwt-token.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent extends CoreComponent implements OnInit {
  authMode = 'login';

  constructor(private authService: AuthService, private jwtService: JWTTokenService,
              private router: Router, private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
  }

  onSubmit(data) {
    if (this.authMode === 'register') {
      this.authService.register(data)
        .subscribe(result => {
          const response: any = result as any;
          if (response.success) {
            this.setAuthMode('login');
          } else {
            console.log(response.error);
          }
        });
    } else if (this.authMode === 'login') {
      this.authService.login(data)
        .subscribe(result => {
          const response: any = result as any;
          if (response.success) {
            console.log(response);
            this.jwtService.setToken(response.data.token);
            this.jwtService.setUserId(response.data.id);
            this.router.navigate(
              [{outlets: {matcha : ['profile', response.data.id]}}],
              {relativeTo: this.activatedRoute.parent})
              .then();
          }
        });
    }
  }

  setAuthMode(mode) {
    this.authMode = mode;
  }

}
