import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuthService } from '../../auth/services/user-auth.service';
import { UserModel } from '../../model/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isError=false
  userData: UserModel[] = []
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  constructor(private user: UserAuthService, private route: Router) {

  }
  ngOnInit(): void {
    this.user.isLoggedIn()
    this.user.isCurentUser.subscribe((res) => {
      console.log("edf", res)
    })

    this.user.getUserData()
    this.user.userData.subscribe({
      next: (res) => {
        this.userData = res
      }
    })
    console.log("d", this.userData)
  }
  login() {
    if (this.loginForm.invalid) {
      this.isError=true
    } 
    else{
      this.isError=false
      this.userData.map((user) => {
        if (user.email == this.loginForm.value.email && user.password == this.loginForm.value.password) {
          this.user.setCurrentUser(user)
          console.log("login works")
          this.route.navigate(['/dashboard'])
        }
      })
    }
  }
}
