import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JWTTokenService} from '../../services/jwt-token.service';

@Component({
  selector: 'app-shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() currentRoute;
  isChatActive = false;
  isNotificationActive = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private jwtService: JWTTokenService) {}

  isActiveRoute(route: string) {
    if (this.currentRoute && this.currentRoute.includes(route)) {
      if (route === 'profile' &&
        this.jwtService.isCurrentUser(this.jwtService.getUserId() as unknown as number)) {
        return true;
      } else {
        return true;
      }
    }
    return false;
  }

  navigate(event: Event, route: string) {
    const commands = [route];
    if (this.isAuth()) {
      if (route === 'logout') {
        this.router.navigate([{outlets: {matcha: 'auth'}}])
          .then(() => {
            console.log(this.jwtService.resetAuthState());
          });
      } else {
        if (route === 'profile') {
          commands.push(this.jwtService.getUserId());
        }
        this.router.navigate([{outlets: {matcha: commands}}])
          .then();
      }
    }
  }

  isAuth() {
    return this.jwtService.getToken() != null && this.jwtService.isTokenExpired() !== true;
  }

  onNotificationActivateEvent(event: Event) {
    this.isNotificationActive = true;
  }

  onNotificationDeactivateEvent(event: Event) {
    this.isNotificationActive = true;
  }

  onChatActivateEvent(event: Event) {
    this.isChatActive = true;
  }

  onChatDeactivateEvent(event: Event) {
    this.isChatActive = false;
  }

  ngOnInit(): void {
    console.log(`Header Nav : ${this.currentRoute}`);
  }

}
