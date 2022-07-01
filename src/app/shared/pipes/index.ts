import { MilliToSecondsPipe } from './milli-to-seconds.pipe';
import { StringToFlagPipe } from './string-to-flag.pipe';
import { GameClockPipe } from './game-clock.pipe';
import { FlagUrlPipe } from './flag-url.pipe';


export const PIPES = [
    MilliToSecondsPipe,
    StringToFlagPipe,
    GameClockPipe,
    FlagUrlPipe
];
