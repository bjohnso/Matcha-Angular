import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {CoreComponent} from './core/core.component';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends CoreComponent implements OnInit {
  title = 'matcha';
  currentRoute;
  constructor(private router: Router, private socket : Socket) {
    super();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit() {
    super.ngOnInit();
    this.router.events.subscribe(event => {
      if (event instanceof RouterEvent && event instanceof NavigationEnd) {
        const nav: NavigationEnd =  event as NavigationEnd;
        this.currentRoute = nav.urlAfterRedirects;
        console.log(this.currentRoute);
      };
    });
  }
}
