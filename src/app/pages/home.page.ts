import { Component } from '@angular/core';
import { HeroComponent } from "../features/hero/hero.component";
import { FeaturesComponent } from "../features/features/features.component";
import { ContactComponent } from "../features/contact/contact.component";
import { FooterComponent } from "../layout/footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [HeroComponent, FeaturesComponent, ContactComponent, FooterComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
})
export class HomePage {

}
