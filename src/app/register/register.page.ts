import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { User} from '../model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userFB: User;
  constructor(private myAuthService:AuthServiceService, private myRouter:Router) { 
    this.userFB={
      email:null,
      password:null
    }
  }

  ngOnInit() {
  }

  async onRegister(){
    const userfb = await this.myAuthService.onRegister(this.userFB);
    //aqui comprabamos si tenemos un user, si ha ocurrido algo nos devolvería un null, si ha ido bien nos da el usuario
    if(userfb){
      console.log('Usuario creado correctamente');
      this.myRouter.navigateByUrl('/tabs/tab1');
    }
  }

}
