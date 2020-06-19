import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'; 
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

    constructor(private firestore: AngularFirestore) { }

    getCategorias() {
        return this.firestore.collection('Categorias').snapshotChanges();
      }
    getCategoriaById(record_id) {
        return this.firestore.collection('Categorias').doc(record_id); 
    }
}

