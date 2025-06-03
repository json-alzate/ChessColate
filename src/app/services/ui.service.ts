import { Injectable, signal } from '@angular/core';

import { ModalController } from '@ionic/angular/standalone';

// Components
import { LoginComponent } from '@shared/components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  // Signal que almacena el nombre del tema actual
  private theme = signal<string>('light');
  // private theme = signal<string>('coffee');

  constructor(
    private modalController: ModalController
  ) { }
  
  /**
   * Returns the current theme.
   * @returns {string} The name of the current theme.
   */
  getTheme() {
    document.documentElement.setAttribute('data-theme', this.theme());
    return this.theme;
  }

  
  /**
   * Changes the current theme to the given one.
   * @param newTheme The name of the theme to change to.
   */
  setTheme(newTheme: string) {
    this.theme.set(newTheme);
  }

  async openLoginModal() {
    const modal = await this.modalController.create({
      component: LoginComponent
    });
    return await modal.present();
  }
}
