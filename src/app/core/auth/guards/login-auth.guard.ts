import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

export const loginAuthGuard: CanActivateFn = (route, state) => {
  
  const isAuthenticated=inject(UserAuthService).isUserAuthenticated()
  // const Inject(UserAuthService)
  const routes=inject(Router)
  if(isAuthenticated){
    return true
  }
  else{
    routes.navigate(['/login'])
    return false
  }
};
