import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  create_NewVideo(record) {
    return this.firestore.collection('Videos').add(record);
  }
  read_Videos() {
    return this.firestore.collection('Videos').snapshotChanges();
  }
  read_Students() {
    return this.firestore.collection('Students').snapshotChanges();
  }

  update_Student(recordID,record){
    this.firestore.doc('Students/' + recordID).update(record);
  }

  delete_Student(record_id) {
    this.firestore.doc('Students/' + record_id).delete();
  }
}