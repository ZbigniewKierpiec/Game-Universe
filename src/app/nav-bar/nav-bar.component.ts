import { NgClass, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink , NgClass , NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {


  isSticky: boolean = false;
  navbarHeight: number = 0;
  pageTopOffset: number = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
      const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      // Calculate the bottom of the navbar relative to the viewport
      const navbarBottom = this.pageTopOffset + this.navbarHeight;

      if (scrollOffset >= navbarBottom) {
          this.isSticky = true;
      } else {
          this.isSticky = false;
      }
  }

  ngOnInit(): void {
      this.navbarHeight = document.getElementById('navbar')!.offsetHeight;
      this.pageTopOffset = document.getElementById('navbar')!.offsetTop;
  }



}
