import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth:AuthServiceService, private router:Router) { }

  canActivate(next:ActivatedRouteSnapshot,  state:RouterStateSnapshot) : Promise<boolean> | Observable<boolean> | boolean{
    if(this.auth.isAuthenticated()){
      return true;
    }else{
      //el metodo navigate siempre recibe un array
      this.router.navigate(['login']);
      return false;
    }
  }
}
