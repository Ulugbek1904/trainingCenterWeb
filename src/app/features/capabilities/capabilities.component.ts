import { Component } from '@angular/core';
import { AppConfigService } from '../../core/services/app-config.service';

@Component({
  selector: 'app-features',
  imports: [],
  templateUrl: './capabilities.component.html',
  styleUrl: './capabilities.component.css'
})
export class FeaturesComponent {
constructor(public config: AppConfigService) {
}
}
