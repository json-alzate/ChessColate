import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';

import { environment } from '@environments/environment';

/* NGRX */
import { provideStore, provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';

import { appReducers, clearStateMetaReducer } from '@store/reducers/app.reducers';
import { CustomRouterStateSerializer } from '@store/states/router.state';
import * as fromEffects from '@store/effects';

addIcons({
  'menu-outline': (allIcons as any)['menuOutline'],
  'heart-outline': (allIcons as any)['heartOutline'],

  // agrega los que uses...
});

bootstrapApplication(AppComponent, {
  providers: [
    // NgRx Store
    provideStore(appReducers, {
      metaReducers: [clearStateMetaReducer]
    }),
    provideEffects(...fromEffects.EFFECTS),
    provideRouterStore({
      serializer: CustomRouterStateSerializer
    }),
    // ...(environment.production ? [] : [provideStoreDevtools({ maxAge: 25, logOnly: true })]),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
