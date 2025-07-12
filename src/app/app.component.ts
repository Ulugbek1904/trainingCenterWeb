import { Component } from '@angular/core';
import { ButtonLabel, ButtonModule } from 'primeng/button';
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { HomePage } from "./pages/home.page"; // Add correct import for ButtonModule

@Component({
  selector: 'app-root',
  standalone: true, // Add this if you want to use 'imports' in the component decorator
  imports: [ButtonModule, NavbarComponent, HomePage],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fix typo: should be 'styleUrls'
})
export class AppComponent {

}
