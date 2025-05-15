import { Action, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '@environments/environment';

import * as fromRouter from '@ngrx/router-store';

// reducers
import { uiReducer } from '@store/reducers/ui.reducer';
import { authReducer } from '@store/reducers/auth.reducer';


// states
import { AppState } from '@store/states/app.state';


import { LOGOUT } from '@store/actions/auth.actions';

// models



export const appReducers: ActionReducerMap<AppState> = {
    ui: uiReducer,
    auth: authReducer,
    router: fromRouter.routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const clearStateMetaReducer =
    <State extends unknown>(reducer: ActionReducer<State>): ActionReducer<State> => (state: State | undefined, action: Action) => {
        if (action.type === LOGOUT) {
            state = {} as State; // ==> Emptying state here
        }
        return reducer(state, action);
    };



