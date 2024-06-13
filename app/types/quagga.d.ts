declare module 'quagga' {
    export function init(
      config: any,
      callback: (err: any) => void
    ): void;
    export function start(): void;
    export function stop(): void;
    export function onDetected(callback: (result: any) => void): void;
    export function offDetected(callback: (result: any) => void): void;
  }
  