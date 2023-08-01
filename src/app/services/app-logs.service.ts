import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppLogsService {

  constructor() { }

  logWaring(message: string, ...optionalParams: any[]) {
    console.warn(message, optionalParams);
  }

  logError(message: string, ...optionalParams: any[]) {
    console.error(message, optionalParams);
  }

}