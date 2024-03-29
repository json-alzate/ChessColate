import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';

import { Plan, Block, PlanTypes } from '@models/plan.model';
import { PlanService } from '@services/plan.service';
import { BlockService } from '@services/block.service';
import { ProfileService } from '@services/profile.service';

@Component({
  selector: 'app-training-menu',
  templateUrl: './training-menu.component.html',
  styleUrls: ['./training-menu.component.scss'],
})
export class TrainingMenuComponent implements OnInit {

  loader: any;
  generalEloPlan5: string | number = '1500?';
  generalEloPlan10: string | number = '1500?';
  generalEloPlan20: string | number = '1500?';
  generalEloPlan30: string | number = '1500?';

  loadActivityChart = false;


  constructor(
    private navController: NavController,
    private planService: PlanService,
    private blockService: BlockService,
    private loadingController: LoadingController,
    private profileService: ProfileService
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.profileService.subscribeToProfile().subscribe((profile) => {
      if (profile) {
        this.generalEloPlan5 = profile.elos?.plan5Total || '1500?';
        this.generalEloPlan10 = profile.elos?.plan10Total || '1500?';
        this.generalEloPlan20 = profile.elos?.plan20Total || '1500?';
        this.generalEloPlan30 = profile.elos?.plan30Total || '1500?';
      }
    });
    this.loadActivityChart = true;
  }

  async createPlan(option: number, planType: PlanTypes) {
    this.showLoading();
    const blocks: Block[] = await this.blockService.generateBlocksForPlan(option);

    // se recorre cada bloque para generar los puzzles
    for (const block of blocks) {
      block.puzzles = await this.blockService.getPuzzlesForBlock(block);
    }

    const newPlan: Plan = await this.planService.newPlan(blocks, planType, option * 60);
    this.closeLoading();
    this.goTo('/puzzles/training');

  }


  async showLoading() {
    this.loader = await this.loadingController.create({
      message: 'Cargando ejercicios del entrenamiento...',
    });

    this.loader.present();
  }

  closeLoading() {
    this.loader.dismiss();
  }


  goTo(path: string) {
    this.navController.navigateForward(path);
  }

}
