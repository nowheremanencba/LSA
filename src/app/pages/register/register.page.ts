import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController, AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private authService:AuthenticationService,
    public alertCtrl: AlertController
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      'fullName': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async signUp() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(() => {
      this.navCtrl.navigateRoot('/home-results');
    });
  }

  // // //
  goToLogin() {
    this.navCtrl.navigateRoot('/');
  }

  tryRegister(value){
    this.authService.registerUser(value)
     .then(res => {
       this.presentAlert("Tu cuenta ha sido creada con exito. Por favor ingresa al login");
     }, err => {
            let mensaje ;
            switch (err.code) {
              case (err.code== "auth/weak-password"):
                mensaje ="El Password debe tener al menos 6 caracteres";
                break;
              case (err.code== "auth/email-already-in-use"):
                mensaje ="El email ya ha sido registrado";
              break;    
              default:
                mensaje =err.code;
              break;
          } 
      console.log(err);
      this.presentAlert(mensaje); 
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
