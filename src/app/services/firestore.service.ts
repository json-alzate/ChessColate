import { Injectable } from '@angular/core';

/** Capacitor Modules **/


/** Firebase Modules **/
import { getApp } from 'firebase/app';
import { User as FirebaseUser } from 'firebase/auth';
import {
  Firestore,
  DocumentReference,
  DocumentData,
  FirestoreSettings,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  getFirestore,
  initializeFirestore,
  collection, query, where, getDocs,
  increment,
  limit,
  Query,
  UpdateData
} from 'firebase/firestore';


// Models
import { Profile } from '@models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private db!: Firestore;
  private profileDocRef!: DocumentReference<DocumentData>;



  constructor() { }

  async init() {
    const firestoreSettings: FirestoreSettings & { useFetchStreams: boolean } = {
      useFetchStreams: false
    };
    initializeFirestore(getApp(), firestoreSettings);
    this.db = getFirestore(getApp());
  }


  /**************************************************************/
  /* PROFILE                                                      */
  /**************************************************************/

  /**
   * Get a user from Firestore
   *
   * @param uid
   * @returns Promise<User>
   */
  async getProfile(uid: string): Promise<Profile | null> {

    this.profileDocRef = doc(this.db, 'Users', uid);
    const docSnap = await getDoc(this.profileDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as Profile;
    } else {
      console.log(`No user found with uid ${uid}`);
      return null;
    }

  }

  


  /**
   * Crea un nuevo perfil
   *
   * @param profile
   * @returns Promise<void>
   */
  createProfile(profile: Profile) {
    return setDoc(doc(this.db, 'Users', profile.uid), profile);
  }

  /**
   * Update a User in firestore
   *
   * @param changes Partial<User>
   */
  async updateProfile(changes: Partial<Profile>): Promise<void> {
    // validate if profileDocRef exists
    if (!this.profileDocRef) {
      throw new Error('No profileDocRef');
    }
    return updateDoc(this.profileDocRef, changes);
  }


  async checkNickname(nickName: string): Promise<string[]> {
    const nicksToReturn: string[] = [];
    const q = query(
      collection(this.db, 'nickNames'),
      where('nickname', '==', nickName)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((document) => {
      const nickToAdd = document.data() as unknown as string;
      nicksToReturn.push(nickToAdd);
    });
    return nicksToReturn;

  }


  async addNewNickName(nickname: string, uidUser: string): Promise<string> {
    const docRef = await addDoc(collection(this.db, 'nickNames'), {
      nickname,
      uidUser
    });
    return docRef.id;
  }




}
