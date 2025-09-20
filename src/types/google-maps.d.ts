declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: unknown) => unknown;
        Marker: new (options: unknown) => unknown;
        InfoWindow: new (options: unknown) => unknown;
        SymbolPath: {
          CIRCLE: unknown;
        };
        event: {
          addListener: (instance: unknown, eventName: string, handler: () => void) => void;
        };
      };
    };
  }
}

export {};
