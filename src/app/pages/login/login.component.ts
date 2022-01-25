import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FireauthService } from 'src/app/services/fireauth/fireauth.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm:FormGroup;

  constructor(
    private fireAuth:FireauthService,
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.email,Validators.required]),
      password: new FormControl('',Validators.required),
    });
  }

  login(){
    const login = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.fireAuth.login(login.email,login.password).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }

}
