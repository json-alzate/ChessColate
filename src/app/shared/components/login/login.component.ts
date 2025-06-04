// core and third party libraries
import { Component, inject, Input, Signal, signal } from '@angular/core';
import { ModalController, PopoverController, IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
// import { TranslateModule, TranslateService } from '@ngx-translate/core';

// states & actions & selectors
import { AuthState } from '@store/states/auth.state';
import { requestLoginGoogle, requestSingUpEmail, requestLoginEmail, setErrorRegister } from '@store/actions/auth.actions';
import { getErrorLogin, getErrorRegister } from '@store/selectors/auth.selectors';

// models
import { User as FirebaseUser } from 'firebase/auth';

// services
import { AuthService } from '@services/auth.service';
import {UiService} from '@services/ui.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [IonicModule, ReactiveFormsModule, 
    // TranslateModule
  ]
})
export class LoginComponent {
  @Input({ required: true }) showAs!: 'modal' | 'popover';

  theme!: Signal<string>;

  private fb = inject(FormBuilder);
  private popoverController = inject(PopoverController);
  private modalController = inject(ModalController);
  private authService = inject(AuthService);
  // private translate = inject(TranslateService);
  private store = inject<Store<AuthState>>(Store);

  formSingUp: FormGroup = this.buildFormSingUp();
  formLogin: FormGroup = this.buildFormLogin();
  formResetPassword: FormGroup = this.buildFormResetPassword();

  showResetPassword = signal(false);
  showEmailPassword = signal(true);
  segmentEmailPassword = signal<'login' | 'singUp'>('login');

  errorLogin = signal<string | null>(null);
  errorSingUp = signal<string | null>(null);
  showPasswordRestoreMessage = signal(false);

  private readonly emailRegexValidator = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

  constructor(
    private uiService: UiService
  ) {
    this.theme = this.uiService.getTheme();
    this.listenAuthState();
    this.store.select(getErrorLogin).subscribe(error => {
      this.errorLogin.set(error);
      if (error) {
        this.showPasswordRestoreMessage.set(false);
        this.formLogin.reset();
      }
    });

    this.store.select(getErrorRegister).subscribe(error => {
      this.errorSingUp.set(error);
      this.formSingUp.get('password')?.reset();
      this.formSingUp.get('rePassword')?.reset();
    });
  }

  get emailFieldLogin() {
    return this.formLogin.get('email');
  }

  get passwordFielLogin() {
    return this.formLogin.get('password');
  }

  get emailFieldSingUp() {
    return this.formSingUp.get('email');
  }

  get passwordFielSingUp() {
    return this.formSingUp.get('password');
  }

  get rePasswordFielSingUp() {
    return this.formSingUp.get('rePassword');
  }

  get emailFieldResetPassword() {
    return this.formResetPassword.get('email');
  }

  private listenAuthState() {
    this.authService.getAuthState().subscribe((dataAuth: FirebaseUser) => {
      if (dataAuth?.email) {
        this.close();
      }
    });
  }

  loginGoogle() {
    this.store.dispatch(requestLoginGoogle());
    this.close();
  }

  segmentChanged(ev: CustomEvent) {
    this.errorLogin.set(null);
    this.errorSingUp.set(null);
    this.segmentEmailPassword.set(ev.detail?.value);
  }

  buildFormLogin(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegexValidator)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmitLogin($event: Event) {
    $event.preventDefault();
    if (this.formLogin.valid) {
      const credentials = this.formLogin.value;
      this.store.dispatch(requestLoginEmail(credentials));
    } else {
      this.formLogin.markAllAsTouched();
    }
  }

  buildFormSingUp(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegexValidator)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rePassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmitSingUp($event: Event) {
    $event.preventDefault();
    if (this.formSingUp.valid) {
      const { password, rePassword, email } = this.formSingUp.value;
      if (password !== rePassword) {
        // const message = this.translate.instant('PasswordsNoMatch');
        const message = 'Las contraseñas no coinciden';
        this.store.dispatch(setErrorRegister({ error: message }));
        return;
      }
      this.store.dispatch(requestSingUpEmail({ email, password, rePassword }));
      this.formSingUp.reset();
    } else {
      this.formSingUp.markAllAsTouched();
    }
  }

  buildFormResetPassword(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegexValidator)]]
    });
  }

  resetPassword($event: Event) {
    $event.preventDefault();
    if (this.formResetPassword.valid) {
      this.authService.sendPasswordResetEmail(this.emailFieldResetPassword?.value).then(() => {
        this.showResetPassword.set(false);
        this.segmentEmailPassword.set('login');
        this.formResetPassword.reset();
        this.showPasswordRestoreMessage.set(true);
      });
    } else {
      this.formResetPassword.markAllAsTouched();
    }
  }

  close() {
    if (this.showAs === 'modal') {
      this.modalController.dismiss().catch(() => {});
    } else if (this.showAs === 'popover') {
      this.popoverController.dismiss().catch(() => {});
    }
  }

  showEmailPasswordTrue() {
    this.showResetPassword.set(true);
   
    this.segmentEmailPassword.set('singUp');
     console.log(this.segmentEmailPassword());
  } 
  hideEmailPassword() {
    this.showResetPassword.set(false);
  }
}
