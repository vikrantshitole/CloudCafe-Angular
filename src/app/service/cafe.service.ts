import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class CafeService {
  constructor(public firestoreService: AngularFirestore) {}

  getCafes() {
    return this.firestoreService.collection('cafes').snapshotChanges();
  }
  addCafes(cafedata) {
    return this.firestoreService.collection('cafes').add(cafedata);
  }
  deleteCafe(cafeId) {
    return this.firestoreService.collection('cafes').doc(cafeId).delete();
  }
  updateCafe(cafeId, cafeData) {
    return this.firestoreService.collection('cafes').doc(cafeId).set(cafeData);
  }
}
