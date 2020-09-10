import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent} from '@angular/router';
import {CoreComponent} from './core/core.component';
import { Socket } from 'ngx-socket-io';
import {NgxSpinnerService} from 'ngx-spinner';
import {JWTTokenService} from './services/jwt-token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends CoreComponent implements OnInit {
  title = 'matcha';
  currentRoute;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private socket: Socket, private spinner: NgxSpinnerService,
              private jwtService: JWTTokenService) {
    super();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit() {
    super.ngOnInit();
    this.router.events.subscribe(event => {
      if (event instanceof RouterEvent && event instanceof NavigationStart) {
        this.spinner.show('nav-spinner').then();
      } else if (event instanceof RouterEvent && event instanceof NavigationEnd) {
        this.spinner.hide('nav-spinner').then();
        const nav: NavigationEnd =  event as NavigationEnd;
        this.currentRoute = nav.urlAfterRedirects;
        if (!event.url.includes('notification:notification') && this.jwtService.getUserId() && !this.jwtService.isTokenExpired()) {
          this.router.navigate([{outlets: {notification: ['notification']}}], {
            skipLocationChange: true,
            queryParamsHandling: 'merge',
          }).then();
        }
      }
    });
  }
}
