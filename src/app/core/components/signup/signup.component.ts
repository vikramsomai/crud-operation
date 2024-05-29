import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { UserAuthService } from '../../auth/services/user-auth.service';
import { UserModel } from '../../model/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule,ReactiveFormsModule,MatSelectModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  errorMessage=''
  isError=false
    userData:UserModel[]=[]
    signupForm=new FormGroup({
      username:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required]),
      role:new FormControl('',[Validators.required]),
    })
    // this.signupForm.get
    constructor(private user:UserAuthService,private route:Router){
          user.getUserData().subscribe({
            next:(res)=>{
              this.userData=res
            }
          })
          // this.signupForm.valueChanges()
    }
    signup(){
   
      if(this.signupForm.invalid){
        this.isError=true
        this.errorMessage="Please fill all filed"
      }else{
        this.isError=false
      this.userData.push(this.signupForm.value as UserModel)
        console.log(this.signupForm.value)
        this.user.storeUserData(this.userData)
        this.route.navigate(['/login'])
      }
    }
}
