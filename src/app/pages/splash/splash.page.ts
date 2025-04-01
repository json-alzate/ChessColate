import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent  } from '@ionic/angular/standalone';

import { UiService} from '@services/ui.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule ]
})
export class SplashPage implements OnInit {

  theme!: Signal<string>;
  constructor(
    private uiService: UiService
  ) { 
    this.theme = this.uiService.getTheme();
  }

  ngOnInit() {
  }

  changeTheme() {
    this.uiService.setTheme('valentine');
  }

}
