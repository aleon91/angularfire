import { Injectable } from '@angular/core';

import { Auth, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "@angular/fire/auth";
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {

  constructor(
    private auth:Auth
  ) { }

  register(email:string,password:string){
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth,email,password);
  }

  login(email:string,password:string){
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  /*googleLogin() {
    const provider = new GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }
  
  private oAuthLogin(provider:any) {
    return signInWithPopup(provider)
      .then((credential) => {
        const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${credential.user.uid}`);
        let data = new User();
        data.id = credential.user.uid;
        data.email = credential.user.email;
        return userRef.set(data,{merge:true});
      })
  }*/

}
