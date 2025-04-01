import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  // Signal que almacena el nombre del tema actual
  private theme = signal<string>('retro');

  
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
}
