import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FireBaseDataService {

  constructor(private store: AngularFirestore) { }

  addUser(User: User, editObj: any) {
    if (editObj) {
      return this.store.collection('Users').doc(editObj.id).update(User);
    } else {
      return this.store.collection('Users').add(User);
    }
  }

  getAllUsers(): any {
    return this.store.collection('Users');
  }

  delete(id: string): any {
    return this.store.collection('Users').doc(id).delete();
  }

  // Default error handling for all actions
  private handleError(error: any) {
    console.log(error)
  }

}
