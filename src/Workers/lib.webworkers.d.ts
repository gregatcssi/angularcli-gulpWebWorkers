interface DedicatedWorkerGlobalScope {
    onmessage: (this: this, ev: MessageEvent) => any;
    postMessage(data: any): void;
    addEventListener(type: "message", listener: (this: this, ev: MessageEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}
declare function postMessage(data: any): void;