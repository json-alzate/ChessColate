import type { IStaticMethods } from "preline/dist";

declare global {
  interface Window {
    // Optional third-party libraries
    
    // Preline UI
    HSStaticMethods: IStaticMethods;
  }
}

export {};