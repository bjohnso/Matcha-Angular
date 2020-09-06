import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() currentRoute;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  navigate(event: Event, route: string) {
    this.router.navigate([route])
      .then();
  }

  ngOnInit(): void {
    console.log(this.currentRoute);
  }

}
