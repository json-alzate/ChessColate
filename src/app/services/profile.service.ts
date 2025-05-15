// core and third party libraries
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

// rxjs

// states
import { AuthState } from '@store/states/auth.state';

// actions
import { setProfile, requestUpdateProfile, updateProfile } from '@store/actions/auth.actions';

// selectors
import { getProfile } from '@store/selectors/auth.selectors';


// models
import { User as FirebaseUser } from 'firebase/auth';
import { Profile } from '@models/profile.model';

// services
import { FirestoreService } from '@services/firestore.service';

// components

// utils
// import { calculateElo } from '@utils/calculate-elo';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profile!: Profile | null;

  constructor(
    private store: Store<AuthState>,
    private firestoreService: FirestoreService
  ) { }

  get getProfile(): Profile | null {
    return this.profile;
  }


  // subscribe to profile
  subscribeToProfile() {
    return this.store.pipe(select(getProfile));
  }

  /**
   * Valida si el perfil existe en la BD y lo lleva al estado redux.
   * Sino existe se inicia el proceso para registrar el perfil en la BD
   *
   * @param dataAuth
   */
  async checkProfile(dataAuth: FirebaseUser) {

    const profile = await this.firestoreService.getProfile(dataAuth?.uid);
    if (profile) {
      this.setProfile(profile);
    } else {
      this.setInitialProfile(dataAuth);
    }

  }

  // request update profile
  requestUpdateProfile(profile: Partial<Profile>) {
    if (this.profile?.uid) {
      const action = requestUpdateProfile({ profile });
      this.store.dispatch(action);
    } else {
      this.profile = { ...this.profile, ...profile } as Profile;
      const action = updateProfile({ profile });
      this.store.dispatch(action);
    }
  }


  // set profile
  setProfile(profile: Profile) {
    this.profile = profile;
    const action = setProfile({ profile });
    this.store.dispatch(action);
  }

  // clear profile
  clearProfile() {
    this.profile = null;
    // const action = setProfile({ profile: null });
    // this.store.dispatch(action);
  }

  /**
   * Update profile
   *
   * @param changes
   */
  updateProfile(changes: Partial<Profile>): Promise<void> {
    this.profile = {
      ...this.profile,
      ...changes
    } as Profile;
    return this.firestoreService.updateProfile(changes);
  }


  /**
   * Verifica si un nickname esta disponible o no
   *
   * @param nickname string
   */
  checkNickNameExist(nickname: string): Promise<string[]> {
    return this.firestoreService.checkNickname(nickname);
  }


  addNewNickName(nickname: string, uidUser: string) {
    return this.firestoreService.addNewNickName(nickname, uidUser);
  }


  private async setInitialProfile(dataAuth: FirebaseUser) {

    const profileForSet: Profile = {
      uid: dataAuth.uid,
      email: dataAuth.email || '',
      lang:  'en',
      createAt: new Date().getTime()
    };

    await this.firestoreService.createProfile(profileForSet);
    this.setProfile(profileForSet);

  }


}
