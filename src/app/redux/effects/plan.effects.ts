import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { from } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';

import {
    requestSavePlan
} from '@redux/actions/plan.actions';

import { PlanService } from '@services/plan.service';

@Injectable()
export class CoordinatesEffects {

    requestSavePlan$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestSavePlan),
            switchMap(({ plan }) =>
                from(this.planService.savePlan(plan)).pipe(
                    mergeMap(() => [])
                ))
        )
    );


    constructor(
        private actions$: Actions,
        private planService: PlanService
    ) { }

}