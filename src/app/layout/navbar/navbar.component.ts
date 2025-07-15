import { Component } from '@angular/core';
import { AppConfigService } from '../../core/services/app-config.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
/**
 *
 */
constructor(public config: AppConfigService) {
  
}
}
