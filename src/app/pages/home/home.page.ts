import { Component, Signal } from '@angular/core';
import { IonContent, IonList, IonThumbnail, IonLabel,  IonItem, IonImg, IonIcon, IonButton, IonFabButton, IonFab, IonTitle, IonToolbar, IonHeader, IonButtons } from '@ionic/angular/standalone';

import { UiService} from '@services/ui.service';

// import { ChesscolateLibComponent } from 'chesscolate-lib';
import { HeaderSliderComponent } from '@pages/home/widgets/header-slider/header-slider.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonIcon, IonContent, HeaderSliderComponent],
})
export class HomePage {

  theme!: Signal<string>;

  constructor(
    private uiService: UiService,
  ) {
    this.theme = this.uiService.getTheme();
  }
}
