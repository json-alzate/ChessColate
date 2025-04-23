import { Component, Signal, signal } from '@angular/core';
import { IonContent, IonIcon, MenuController, IonFab, IonFabButton } from '@ionic/angular/standalone';

import { UiService} from '@services/ui.service';

// import { ChesscolateLibComponent } from 'chesscolate-lib';
import { HeaderSliderComponent } from '@pages/home/widgets/header-slider/header-slider.component';
import { CardsBlockComponent } from '@pages/home/widgets/cards-block/cards-block.component';
import { CommonSliderComponent } from '@pages/home/widgets/common-slider/common-slider.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonFabButton, IonFab, IonIcon, IonContent, 
    HeaderSliderComponent, CardsBlockComponent, CommonSliderComponent],
})
export class HomePage {

  theme!: Signal<string>;

  constructor(
    private uiService: UiService,
    private menuController: MenuController
  ) {
    this.theme = this.uiService.getTheme();
  }

  openMenu(){
    this.menuController.open('main-menu');
  }
}
