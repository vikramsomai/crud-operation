import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  userData=new BehaviorSubject<UserModel[]>([])
  isCurentUser=new BehaviorSubject<any>('')
  isLogin=new BehaviorSubject<any>('')
  isUser=signal<UserModel>({username:'',email:'',password:'',role:''})
  constructor() { }
  storeUserData(user:UserModel[]){
    this.userData.next(user)
      localStorage.setItem("new-users",JSON.stringify(user))
  }
  getUserData(){
      this.userData.next(JSON.parse(localStorage.getItem("new-users") as string) || [])
      // this.userData.subscribe((res)=>{
      // })
      return this.userData
  }
  setCurrentUser(user:UserModel){
    localStorage.setItem("logged-user",JSON.stringify(user)) 
    this.isCurentUser.next(user)
  }
  isLoggedIn(){
    this.isCurentUser.next(JSON.parse(localStorage.getItem("logged-user") as string))
    if(localStorage.getItem("logged-user")!=undefined){
      return true
    }
    else{
      return false
    }
  }
  isUserAuthenticated(){
    const data=JSON.parse(localStorage.getItem("logged-user") as string)
    this.isCurentUser.next(data)
    return data?true:false
  }
  logout(){
    localStorage.removeItem("logged-user")
  }
}
