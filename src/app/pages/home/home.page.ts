import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

// import { ChesscolateLibComponent } from 'chesscolate-lib';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, 
    // ChesscolateLibComponent
  ],
})
export class HomePage {
  constructor() {}
}
