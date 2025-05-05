export interface User {
    uid: string;
    name?: string;
    numberPuzzlesPlayed?: number;
    scoreCoordinatesW?: number;
    scoreCoordinatesB?: number;
    country?: string;
    createAt: number;
}
