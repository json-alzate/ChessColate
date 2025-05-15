import { Component, Signal } from '@angular/core';
import { IonApp, IonRouterOutlet, IonMenu } from '@ionic/angular/standalone';

import { initializeApp } from 'firebase/app';
import { environment } from '@environments/environment';

import { Store } from '@ngrx/store';
import { AppState } from '@store/states/app.state';

// actions
import { requestLoginGoogle } from '@store/actions/auth.actions';

// models
import { User as FirebaseUser } from 'firebase/auth';

// services
import { UiService } from '@services/ui.service';
import { FirestoreService } from '@services/firestore.service';
import { AuthService } from '@services/auth.service';
import { ProfileService } from '@services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonMenu],
})
export class AppComponent {

  theme!: Signal<string>;
  constructor(
    private store: Store<AppState>,
    private uiService: UiService,
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private profileService: ProfileService
  ) {
    this.theme = this.uiService.getTheme();
    this.initApp();
  }

  async initApp() {

    this.initFirebase();
  }

  async initFirebase() {
    initializeApp(environment.firebase);
    await this.authService.init();
    await this.firestoreService.init();
    // se obtiene el estado del usuario -login-
    this.authService.getAuthState().subscribe((dataAuth: FirebaseUser) => {
      // se obtienen los datos del usuario, sino existe se crea el nuevo usuario
      if (dataAuth) {
        this.profileService.checkProfile(dataAuth);
      } else {
        this.profileService.clearProfile();
      }
    });
  }


  loginWithGoogle() {
    console.log('loginWithGoogle');
    const action = requestLoginGoogle();
    this.store.dispatch(action);
  }
}
