import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

  getData() {
    console.log(this.firestore.collection('peliculas').snapshotChanges())
    return this.firestore.collection('peliculas').valueChanges()
  }
}
