//core and third party libraries
import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Store } from '@ngrx/store';

import { TranslocoService } from '@ngneat/transloco';


import {
  User as FirebaseUser,
  UserCredential,
  Auth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  getAuth,
  signInWithPopup,
  signInAnonymously,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithCredential,
  initializeAuth,
  indexedDBLocalPersistence
} from 'firebase/auth';
import { getApp } from 'firebase/app';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

// rxjs
import { from, Subject } from 'rxjs';

// states
import { AuthState } from '@redux/states/auth.state';

// actions
import { setErrorLogin, setErrorRegister } from '@redux/actions/auth.actions';

// selectors

// models

// services

// components


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth;

  constructor(
    private translocoService: TranslocoService,
    private store: Store<AuthState>
  ) { }

  init() {
    this.auth = this.setAuth();
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
   * Ingresa anónimo
   */

  async initSignInAnonymously() {
    const auth = this.setAuth();
    signInAnonymously(auth);
  }


  /**
   * Ingresa con Google
   */
  async loginGoogle() {
    const answer = await GoogleAuth.signIn();
    const credential = GoogleAuthProvider.credential(answer.authentication.idToken, answer.authentication.accessToken);
    signInWithCredential(this.auth, credential);
  }


  /**
   * Para escuchar el estado del usuario logueado
   * @returns Subject<FirebaseUser>
   */
  getAuthState(): Subject<FirebaseUser> {
    const authState = new Subject<FirebaseUser>();
    this.auth.onAuthStateChanged(user => {
      authState.next(user);
    });
    return authState;
  }


  /**
   * Registra un usuario con email y contraseña
   * @param email 
   * @param password 
   */
  async createUserWithEmailAndPassword(email: string, password: string) {
    const auth = this.setAuth();
    createUserWithEmailAndPassword(auth, email, password).catch(error => {
      let message = this.translocoService.translate('RegisterError');
      if (error.code === 'auth/email-already-in-use') {
        message = this.translocoService.translate('EmailReadyInUse');
      }
      const action = setErrorRegister({ error: message });
      this.store.dispatch(action);
    });
  }

  /**
   * Ingresa con email y contraseña 
   * @param email 
   * @param password 
   */
  async signInWithEmailAndPassword(email, password) {
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
   * @returns 
   */
  logout() {
    return from(this.auth.signOut());
  }


}
