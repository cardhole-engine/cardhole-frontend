import {Injectable} from "@angular/core";
import {Observable, Subscriber} from "rxjs";
import {Message} from "./networking/message";
import {LoginMessage} from "./networking/login-message";

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  webSocket: WebSocket | null = null;

  connect(name: string): Observable<string> {
    let connection: ConnectionService = this;
    let placeholderSubscriber: Subscriber<string> | null = null;
    let observable: Observable<string> = new Observable(
      (subscriber: Subscriber<string>) => placeholderSubscriber = subscriber);

    this.webSocket = new WebSocket('ws://localhost:8080/websocket',
      'subprotocol.demo.websocket');

    this.webSocket.onopen = function (): void {
      console.log('Client connection opened');
      console.log('Subprotocol: ' + this.protocol);
      console.log('Extensions: ' + this.extensions);

      connection.sendMessage(new LoginMessage(name));
    };

    this.webSocket.onmessage = function (event) {
      placeholderSubscriber?.next(event.data);
    };
    this.webSocket.onerror = function (event) {
      console.log('Client error: ', event);
      placeholderSubscriber?.complete();
    };
    this.webSocket.onclose = function (event) {
      console.log('Client connection closed: ' + event.code);
      placeholderSubscriber?.complete();
    };

    return observable;
  }

  disconnect(): void {
    if (this.webSocket != null) {
      this.webSocket.close();

      this.webSocket = null;
    }
  }

  sendMessage(message: Message): void {
    if (this.webSocket != null) {
      this.webSocket.send(JSON.stringify(message));
    }
  }

  isConnected(): boolean {
    return this.webSocket !== null && this.webSocket.readyState !== WebSocket.CLOSED;
  }
}
