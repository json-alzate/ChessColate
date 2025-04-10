import { Component, Signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonList, IonThumbnail, IonLabel, IonCardContent, IonCardTitle, IonCardSubtitle, IonItem, IonCard } from '@ionic/angular/standalone';

import { UiService} from '@services/ui.service';

// import { ChesscolateLibComponent } from 'chesscolate-lib';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCard, IonItem, IonCardSubtitle, IonCardTitle,  IonList, IonThumbnail, IonLabel, IonCardContent, IonImg, IonHeader, IonToolbar, IonTitle, IonContent, 
    // ChesscolateLibComponent
  ],
})
export class HomePage {

  theme!: Signal<string>;

  constructor(
    private uiService: UiService,
  ) {
    this.theme = this.uiService.getTheme();
  }
}
