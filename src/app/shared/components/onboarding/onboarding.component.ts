//core and third party libraries
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store, select } from '@ngrx/store'

// rxjs

// states
import { AuthState } from '@redux/states/auth.state';


// actions
import { requestUpdateProfile, addNewNickName } from '@redux/actions/auth.actions';

// selectors
import { getProfile } from '@redux/selectors/auth.selectors';

// models
import { Flag } from '@models/tools.models';
import { Profile } from '@models/profile.model';

// services
import { ToolsService } from '@services/tools.service';
import { ProfileService } from '@services/profile.service';

// components

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {

  formOnboarding: FormGroup;

  flags: Flag[] = [];
  flagsBackUp: Flag[] = [];

  allowNickName = false;

  profile: Profile;

  constructor(
    private toolsService: ToolsService,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private modalController: ModalController,
    private store: Store<AuthState>
  ) {
    this.flags = this.toolsService.flags;
    this.flagsBackUp = [...this.flags];
    this.buildFormOnboarding();

    // TODO: Cancelar subscribe
    this.store.select(getProfile).subscribe(profile => this.profile = profile);
  }

  ngOnInit() { }

  buildFormOnboarding() {
    this.formOnboarding = this.formBuilder.group({
      nikName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      country: ['', [Validators.required]]
    });
  }

  get nikNameField() {
    return this.formOnboarding.get('nikName');
  }

  get countryField() {
    return this.formOnboarding.get('country');
  }

  onSearchFlagChange(event: any) {
    const query = event?.detail?.value;
    if (query) {
      this.flags = this.flagsBackUp.filter(flag => flag.Country.toLowerCase().includes(query.toLowerCase()));
    } else {
      this.flags = [...this.flagsBackUp];
    }
  }

  onCancelFlagSearch(event: any) {
    this.flags = [...this.flagsBackUp];
  }

  save() {
    if (!this.allowNickName) {
      return;
    }

    const action = requestUpdateProfile({
      profile: {
        name: this.nikNameField.value,
        country: this.countryField.value
      }
    });
    this.store.dispatch(action);

    const actionAddNick = addNewNickName({
      nickname: this.nikNameField.value,
      uidUser: this.profile?.uid
    });
    this.store.dispatch(actionAddNick);


    this.modalController.dismiss();
  }

  checkNickname(event: any) {
    const nickName = event?.detail?.value;
    if (!nickName) {
      return;
    }

    this.profileService.checkNickNameExist(nickName).then((result) => {

      if (result?.length === 0) {
        this.allowNickName = true;
      } else {
        this.allowNickName = false;
        this.nikNameField.markAsDirty();
      }
      console.log('result nickName ', result);
    }).catch(() => this.allowNickName = false);
  }

}
