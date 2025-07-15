import { Component } from '@angular/core';
import { AppConfigService } from '../../core/services/app-config.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
constructor(public config: AppConfigService) {
}
}
