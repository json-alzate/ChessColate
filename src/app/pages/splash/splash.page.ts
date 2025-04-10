import { Component, OnInit, signal, Signal, computed, effect } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonImg  } from '@ionic/angular/standalone';

import { sync } from '@models/sync.model';

import { UiService} from '@services/ui.service';



@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonImg ]
})
export class SplashPage implements OnInit {

  theme!: Signal<string>;

  syncSteps = signal<sync[]>([
    { id: 1, name: 'theme', sync: false, description: 'Synchronizing themes...', failed: false },
    { id: 2, name: 'Puzzles', sync: false, description: 'Synchronizing puzzles...', failed: false },
    { id: 3, name: 'Positions', sync: false, description: 'Synchronizing positions...', failed: false },
    { id: 4, name: 'Coordinates', sync: false, description: 'Synchronizing coordinates...', failed: false },
    { id: 5, name: 'Maps', sync: false, description: 'Synchronizing maps...', failed: false },
    { id: 6, name: 'Settings', sync: false, description: 'Synchronizing settings...', failed: false }
  ]);

  percentageSync = computed(() => {
    const completedSteps = this.syncSteps().filter(step => step.sync).length;
    return (completedSteps / this.syncSteps().length) * 100;
  });

  currentSyncStepDescription = computed(() => {
    const nextStep = this.syncSteps().find(step => !step.sync);
    return nextStep ? nextStep.description : 'Synchronization complete!';
  });

  syncFailed = computed(() => this.syncSteps().some(step => step.failed));

  constructor(
    private uiService: UiService,
    private router: Router
  ) { 
    this.theme = this.uiService.getTheme();
    effect(() => {
      if (this.currentSyncStepDescription() === 'Synchronization complete!') {
        this.onSyncComplete();
      }
    });

    effect(() => {
      if (this.syncFailed()) {
        this.onSyncFailed();
      }
    });
  }

  

  ngOnInit() {
    this.startSync();
  }


  startSync() {
    for (let i = 0; i < this.syncSteps().length; i++) {
      setTimeout(() => {
        this.syncSteps.update(steps => {
          const updatedSteps = [...steps];
          updatedSteps[i] = { ...updatedSteps[i], sync: true }; // Use clone the object for reactivity
          return updatedSteps;
        });
      }, i * 1000);
    }
  }

  onSyncComplete() {
    console.log('Sync complete');
    // Navigate to the home page
    this.router.navigate(['/home']);
  }

  onSyncFailed() {
    console.error('Sync failed');
  }

}
