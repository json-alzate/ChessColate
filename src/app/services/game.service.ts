//core and third party libraries
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

// rxjs

// states
import { CurrentGameState, StatusCurrentGame } from '@redux/states/current-game.state';

// actions
import { setCurrentGame, setStatusCurrentGame } from '@redux/actions/current-game.actions';
import { addMove } from '@redux/actions/moves.actions';

// selectors

// models
import { Game, Move } from '@models/game.model';
import { Game as GameSocket } from '@models/sockets.model';

// services

// components

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private store: Store<CurrentGameState>
  ) { }

  startGameFromSocket(gameSocket: GameSocket, uidUser?: string) {

    console.log('uidUser', uidUser);
    
    const game: Game = {
      uid: gameSocket.uid,
      playerBlack: gameSocket.black,
      uidUserBlack: gameSocket.uidUserBlack,
      uidUserWhite: gameSocket.uidUserWhite,
      playerWhite: gameSocket.white,
      createAt: gameSocket.createAt,
      moves: [],
      movesFen: [],
      movesHumanHistoryRow: [],
      pgn: '',
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      timeControl: gameSocket.timeControl,
      orientation: uidUser === gameSocket.uidUserBlack ? 'b' : 'w',
      uidCurrentUser: uidUser,
      status: 'playing'
    };

    this.setCurrentGame(game);
    this.setStatusCurrentGame(StatusCurrentGame.playing);

  }

  private setCurrentGame(game: Game) {
    const action = setCurrentGame({ game });
    this.store.dispatch(action);
  }

  private setStatusCurrentGame(status: StatusCurrentGame) {
    const action = setStatusCurrentGame({ status });
    this.store.dispatch(action);
  }

}
