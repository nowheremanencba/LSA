import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/services/authentication.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private authService:AuthenticationService
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: '¿Olvidaste tu Password?',
      message: 'Ingresa tu email para enviar un link del reset del password',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: 'Email was sended successfully.',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // // //
  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }

  goToHome() {
    this.navCtrl.navigateRoot('/home-results');
  }

  loginUser(value){ 
    this.authService.loginUser(value)
    .then(res => {
      console.log(res);
      this.navCtrl.navigateForward('/dashboard');
    }, err => {
      debugger;
      let mensaje ; 
      
      if (err.code.localeCompare("auth/wrong-password")==0) {
        mensaje ="El password es incorrecto";
        this.presentAlert(mensaje); 
      }
      if (err.code.localeCompare( "auth/user-not-found")==0) {
        mensaje ="Usuario no encontrado";
        this.presentAlert(mensaje); 
      }
      if (err.code.localeCompare( "auth/too-many-requests")==0) {
        mensaje ="Demasiados intentos fallidos, vuelva intentar mas tarde";
        this.presentAlert(mensaje); 
      }
      if (mensaje ==undefined) {
        this.presentAlert(err.message);    
      }
      console.log(err);
     /* switch (err.code) {
        case (err.code.localeCompare( "auth/user-not-found")==0): 
          mensaje ="Usuario no encontrado";
          break; 
        case (err.code.localeCompare("auth/wrong-password")==0):
          mensaje ="El password es incorrecto";
          break;     
        default:
          mensaje =err.message;
        break;
    } */
       
      
    })
  }
  async presentAlert(mensaje:string) {
    const alert = await this.alertCtrl.create({
      header: 'Atencion', 
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
  
}
