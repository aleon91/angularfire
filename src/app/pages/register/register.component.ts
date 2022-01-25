import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Roles } from 'src/app/models/roles.model';
import { User } from 'src/app/models/user.model';
import { FireauthService } from 'src/app/services/fireauth/fireauth.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm:FormGroup;

  constructor(
    private fireAuth:FireauthService,
    private fireStore:FirestoreService
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.email,Validators.required]),
      password: new FormControl('',Validators.required),
      repassword: new FormControl('',Validators.required)
    });
  }

  register(){
    if(this.registerForm.value.password === this.registerForm.value.repassword){
      this.fireAuth.register('demo@demo.local','Password1$').then(res => {
        console.log(res.user.uid);
        let user = new User();
        user.uid = res.user.uid;
        user.name = this.registerForm.value.name;
        user.email = this.registerForm.value.email;
        let roles = new Roles();
        roles.subscriber = true;
        user.roles = roles;
        this.save(user);
      }).catch(err => {
        console.log(err);
      });
    }else{

    }
  }

  save(user:User){
    this.fireStore.setDoc('users',user.uid,user).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }

}
