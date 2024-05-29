import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router, RouterConfigOptions, RouterLink } from '@angular/router';
import { UserAuthService } from '../../auth/services/user-auth.service';
import { UserModel } from '../../model/user.model';
import { HighlightDirective } from '../../auth/directives/highlight.directive';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule,MatToolbarModule,MatIconModule,RouterLink,HighlightDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLogin:boolean=false
  currentUser:UserModel={username:'',email:'',password:'',role:''}
    constructor(private user:UserAuthService,private route:Router){
        
    }
    ngOnInit(): void {
      this.user.isCurentUser.subscribe({
        next:(res)=>{
            // this.isLogin=this.user.isUserAuthenticated()
            if(res)
              this.isLogin=true
            else
            this.isLogin=false
        },
        error:()=>{

        }
      })
      console.log("current user",this.user.isLoggedIn())
      this.isLogin=this.user.isLoggedIn()
      this.user.isCurentUser.subscribe({
        next:(res)=>{
          this.currentUser=res
        }
      })
      console.log("navbar",this.currentUser)
      
    }
    logout(){
      this.user.logout()
      this.route.navigate(['/login'])
    }
}
