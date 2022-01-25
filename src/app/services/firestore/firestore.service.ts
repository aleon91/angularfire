import { Injectable } from '@angular/core';
import { getFirestore, collection, doc, setDoc, deleteDoc, Firestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore:Firestore
  ) { }

  getCollection(path:string){
    const db = getFirestore();
    return collection(db,path);
  }

  getDoc(path:string,id:string){
    const db = getFirestore();
    return doc(db,path,id);
  }

  setDoc(path:string,id:string,data:any){
    const db = getFirestore();
    return setDoc(doc(db,path,id),JSON.parse(JSON.stringify(data)));
  }

  updateDoc(path:string,id:string,data:any){
    const db = getFirestore();
    const dataRef = doc(db,path,id);
    return setDoc(dataRef,data,{merge:true});
  }

  deleteDoc(path:string,id:string){
    const db = getFirestore();
    deleteDoc(doc(db,path,id));
  }

}
