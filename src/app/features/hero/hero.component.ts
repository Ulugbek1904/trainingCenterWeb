import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AppConfigService } from '../../core/services/app-config.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [ButtonModule, RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

constructor(public config: AppConfigService) {
}
}
