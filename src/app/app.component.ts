import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, NavbarComponent, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  constructor(public router: Router) {}
}
