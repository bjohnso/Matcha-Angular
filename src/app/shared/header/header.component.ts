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

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private jwtService: JWTTokenService) {}

  isActiveRoute(route: string) {
    if (this.currentRoute.includes(route)) {
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
    if (route === 'profile') {
      commands.push(this.jwtService.getUserId());
    }
    this.router.navigate(commands)
      .then();
  }

  ngOnInit(): void {
    console.log(this.currentRoute);
  }

}
