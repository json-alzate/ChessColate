import { Injectable } from '@angular/core';

/** Capacitor Modules **/
import { ConnectionStatus, Network } from '@capacitor/network';

import { randomNumber } from '@utils/random-number';

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
  Query
} from 'firebase/firestore';


// Models
import { Profile } from '@models/profile.model';
import { CoordinatesPuzzle } from '@models/coordinates-puzzles.model';
import { Puzzle } from '@models/puzzle.model';
import { UserPuzzle } from '@models/user-puzzles.model';
import { Plan } from '@models/plan.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private db: Firestore;
  private profileDocRef: DocumentReference<DocumentData>;



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
  async getProfile(uid: string): Promise<Profile> {

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
    const nicksToReturn = [];
    const q = query(
      collection(this.db, 'nickNames'),
      where('nickname', '==', nickName)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((document) => {
      const nickToAdd = document.data();
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


  /**
   // ----------------------------------------------------------------------------
   Coordinates Puzzles
   */

  async getCoordinatesPuzzles(uidUser: string): Promise<CoordinatesPuzzle[]> {
    const coordinatesPuzzlesToReturn: CoordinatesPuzzle[] = [];
    const q = query(
      collection(this.db, 'coordinatesPuzzles'),
      where('uidUser', '==', uidUser)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((document) => {
      const coordinaPuzzleToAdd = document.data() as CoordinatesPuzzle;
      coordinaPuzzleToAdd.uid = document.id;
      coordinatesPuzzlesToReturn.push(coordinaPuzzleToAdd);
    });

    return coordinatesPuzzlesToReturn;

  }

  async addCoordinatesPuzzle(coordinatesPuzzle: CoordinatesPuzzle): Promise<string> {
    const docRef = await addDoc(collection(this.db, 'coordinatesPuzzles'), coordinatesPuzzle);
    return docRef.id;
  }




  /**
   // ----------------------------------------------------------------------------
    User Puzzles
   */


  /**
   * Gets the puzzles that the user has made
   * Obtiene los problemas que el usuario a realizado
   *
   * @param uidUser
   * @returns
   */
  async getUserPuzzlesByUidUser(uidUser: string): Promise<UserPuzzle[]> {
    const userPuzzlesToReturn: UserPuzzle[] = [];
    const q = query(
      collection(this.db, 'userPuzzles'),
      where('uidUser', '==', uidUser)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((document) => {
      const userPuzzleToAdd = document.data() as UserPuzzle;
      userPuzzleToAdd.uid = document.id;
      userPuzzlesToReturn.push(userPuzzleToAdd);
    });

    return userPuzzlesToReturn;

  }


  /**
   * Add one Puzzle done
   * Adiciona un puzzle realizado
   *
   * @param userPuzzle
   * @returns
   */
  async addOneUserPuzzle(userPuzzle: UserPuzzle): Promise<string> {
    const docRef = await addDoc(collection(this.db, 'userPuzzles'), userPuzzle);
    return docRef.id;
  }


  /**
   // ----------------------------------------------------------------------------
    Plan
   */

  /**
   * Get plans from firestore
   * Obtiene los planes de firestore
   *
   * @param uidUser
   * @returns
   * */
  async getPlans(uidUser: string): Promise<Plan[]> {
    const plansToReturn: Plan[] = [];
    const q = query(
      collection(this.db, 'plans'),
      where('uidUser', '==', uidUser)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((document) => {
      const planToAdd = document.data() as Plan;
      planToAdd.uid = document.id;
      plansToReturn.push(planToAdd);
    });

    return plansToReturn;
  }


  /**
   * Save a plan in firestore
   * Guarda un plan en firestore
   *
   * @param plan
   * @returns
   * */
  async savePlan(plan: Plan): Promise<string> {
    const docRef = await addDoc(collection(this.db, 'plans'), plan);

    console.log('Document written with ID: ', docRef.id);

    return docRef.id;
  }



  //------- Admin only

  // add new puzzle
  async adminAddNewPuzzle(puzzleToAdd: Puzzle): Promise<string> {
    await setDoc(doc(this.db, 'puzzles', puzzleToAdd.uid), puzzleToAdd);
    return puzzleToAdd.uid;
  }

  // get total number of puzzles in db
  async adminGetTotalPuzzles(): Promise<number> {
    const q = query(
      collection(this.db, 'puzzles'),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  }






}
