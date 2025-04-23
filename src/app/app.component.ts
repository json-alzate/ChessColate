import { Component, Signal } from '@angular/core';
import { IonApp, IonRouterOutlet, IonMenu, IonButton, IonButtons, IonTitle, IonHeader, IonToolbar, IonContent } from '@ionic/angular/standalone';

import { UiService} from '@services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonContent, IonToolbar, IonHeader, IonTitle, IonButtons, IonButton, IonApp, IonRouterOutlet, IonMenu ],
})
export class AppComponent {

  theme!: Signal<string>;
  constructor(
    private uiService: UiService
  ) {
    this.theme = this.uiService.getTheme();
  }
}
