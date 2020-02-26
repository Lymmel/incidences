import { Injectable } from '@angular/core';
import { User } from 'src/app/model/User';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public user: User;


  //variable para ver si el usuario esta logeado o no.  
  public isLogged: any = false;

  constructor(private localS: NativeStorage, private google: GooglePlus, private router: Router, public auth: AngularFireAuth) {
    //En caso de que no haya ningún usuario logeado devuelve un null.
    auth.authState.subscribe(user => (this.isLogged = user));
  }

  public async checkSession(): Promise<void> {
    //si es null, si no está iniciado.
    if (!this.user) {
      try {
        this.user = await this.localS.getItem('user');
      } catch (error) {
        this.user = null;
      }
    }
  }

  public isAuthenticated(): boolean {
    //esta ternaria, si es null daría false y si no lo es daría el true.
    return this.user ? true : false
  }

  /*
  * Almacena el usuario en local con el nombre
  * @param user el usuario a almacenar, y en caso de por defecto se eliminará
  */
  public async saveSession(user?: User) {
    if (user) {
      await this.localS.setItem('user', user);
    } else {
      await this.localS.remove('user');
    }
  }

  public loginGoogle(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      //lógica
      console.log("EN EL SERVICIO")
      this.google.login({}).then(d => {
        if (d && d.email) {
          let user: User = {
            email: d.email,
            displayName: d.displayName,
            imageUrl: d.imageUrl,
            userId: d.user,
          }
          this.user = user;
          this.saveSession(user);
          //Ya está guardado
          //this.router.navigate(['tabs']);
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch(err => resolve(false));
    });
  }

  public async logout() {
    //nube
    await this.google.logout();
    //usuario
    this.user = null;
    await this.saveSession();
    //cookie
    this.router.navigate(['login']);
  }



  //Login
  async onLogin(user: User) {
    return new Promise(async (resolve, reject) => {
      try {
        const userFB = await this.auth.auth.signInWithEmailAndPassword(
          user.email,
          user.password
        );
        if (userFB) {
          console.log('Logeado correctamente!');
          console.log(userFB);
          //this.router.navigateByUrl('/tabs/tab1');
          this.user = {
            email: userFB.user.email,
            displayName: userFB.user.displayName,
            imageUrl: userFB.user.photoURL,
            userId: userFB.user.uid
          }
          resolve(this.user);
        }else{
          reject();
        }
      } catch (err) {
        reject(err);
      }
    })
  }


  //Register
  async onRegister(userfb: User): Promise<firebase.auth.UserCredential> {
    try {
      return await this.auth.auth.createUserWithEmailAndPassword(
        userfb.email,
        userfb.password
      );
    } catch (error) {
      console.log('Error al registrar usuario', error);
      return null;
    }
  }


}



