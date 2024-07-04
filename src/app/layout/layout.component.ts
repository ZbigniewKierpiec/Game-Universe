import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { GoToTopComponent } from "../go-to-top/go-to-top.component";
import { filter } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-layout',
    standalone: true,
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
    imports: [RouterOutlet, NavBarComponent, GoToTopComponent, NgIf]
})
export class LayoutComponent {

  isNavbarVisible: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isNavbarVisible = !event.url.includes('/home');
      }
    });
  }



}
