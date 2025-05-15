import { Injectable } from '@angular/core';

import { Capacitor } from '@capacitor/core';
import { Store } from '@ngrx/store';

import { Platform } from '@ionic/angular';

import { FirebaseAuthentication } from '@capacitor-firebase/authentication';


import {
  User as FirebaseUser,
  UserCredential,
  Auth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithCredential,
  initializeAuth,
  indexedDBLocalPersistence
} from 'firebase/auth';
import { getApp } from 'firebase/app';


// rxjs
import { from, Subject } from 'rxjs';

// states
import { AuthState } from '@store/states/auth.state';

// actions
import { logOut, setErrorLogin, setErrorRegister } from '@store/actions/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth!: Auth;

  constructor(
    private platform: Platform,
    private store: Store<AuthState>
  ) { }

  init() {
    this.auth = this.setAuth();
  }

  // actions
  triggerLogout() {
    const action = logOut();
    this.store.dispatch(action);
  }


  setAuth() {
    let auth;
    if (Capacitor.isNativePlatform()) {
      auth = initializeAuth(getApp(), {
        persistence: indexedDBLocalPersistence
      });
    } else {
      auth = getAuth();
    }
    return auth;
  }


  /**
   * Para escuchar el estado del usuario logueado
   *
   * @returns Subject<FirebaseUser>
   */
  getAuthState(): Subject<FirebaseUser> {
    const authState = new Subject<FirebaseUser>();
    this.auth.onAuthStateChanged(user => {
      authState.next(user as FirebaseUser);
    });
    return authState;
  }


  /**
   * Registra un usuario con email y contraseña
   *
   * @param email
   * @param password
   */
  async createUserWithEmailAndPassword(email: string, password: string) {
    const auth = this.setAuth();
    createUserWithEmailAndPassword(auth, email, password).catch(error => {
      // let message = this.translateService.instant('RegisterError');
      let message = 'Error registro de usuario';
      if (error.code === 'auth/email-already-in-use') {
        // message = this.translateService.instant('EmailReadyInUse');
        message = 'El email ya esta en uso';
      }
      const action = setErrorRegister({ error: message });
      this.store.dispatch(action);
    });
  }

  /**
   * Ingresa con email y contraseña
   *
   * @param email
   * @param password
   */
  async signInWithEmailAndPassword(email: string, password: string) {
    const auth = this.setAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }


  /**
   * Send a password reset email
   *
   * @param email
   * @returns Promise<void>
   */
  sendPasswordResetEmail(email: string) {
    const auth = this.setAuth();
    return sendPasswordResetEmail(auth, email);
  }

  /**
   * Cierra sesión
   *
   * @returns
   */
    logout() {
      return from(this.auth.signOut());
    }
  

  /**
* Ingresa con Google
*/
  async loginGoogle() {

    let userCredential: UserCredential | void;
    if (this.platform.is('capacitor')) {
      userCredential = await this.loginWithGoogleNative();
    } else {
      userCredential = await this.loginWithGoogleWeb();
    }
  }


  /**
   * Launch Login with google native
   *
   * @private
   * @returns Promise<UserCredential>
   */
  private async loginWithGoogleNative(): Promise<UserCredential> {
    // 1. Create credentials on the native layer
    const result = await FirebaseAuthentication.signInWithGoogle()
      .catch(error => {
        console.log('error', error);
      });
    // 2. Sign in on the web layer using the id token and nonce
    if (result) {
      const credential = GoogleAuthProvider.credential(result.credential?.idToken);
      const userSignedIn = await signInWithCredential(this.auth, credential);
      return userSignedIn;
    }
    return {} as UserCredential;
  }

  /**
   * Show Login with google popup for web
   *
   * @private
   * @returns Promise<UserCredential>
   */
  private async loginWithGoogleWeb(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

}
