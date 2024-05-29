import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { inject } from '@angular/core';

export const inactiveAuthGuard: CanActivateFn = (route, state) => {
  const isAuthenticated=inject(UserAuthService).isUserAuthenticated()
  const routes=inject(Router)
  if(isAuthenticated){
    routes.navigate(['/dashboard'])
    return false
  }
  else{
    return true
  }
};
