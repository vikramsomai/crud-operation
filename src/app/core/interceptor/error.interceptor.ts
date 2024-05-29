import { HttpErrorResponse, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    catchError((error:HttpErrorResponse)=>{
      console.log("error",error)
      if(error.status==404){
        console.log("Invalid request")
      }
      else if(error.status==401){
        console.log("Invalid credentials")
      }
        return throwError(()=>error)
    })
  )
};
