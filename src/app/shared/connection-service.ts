import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  webSocket: WebSocket | null = null;

  connect(): void {
    this.webSocket = new WebSocket('ws://localhost:8080/websocket',
      'subprotocol.demo.websocket');

    this.webSocket.onopen = function () {
      console.log('Client connection opened');
      console.log('Subprotocol: ' + this.protocol);
      console.log('Extensions: ' + this.extensions);

      this.send('{"type": "LOGIN_MESSAGE", "name": "testuser"}');
    };

    this.webSocket.onmessage = function (event) {
      console.log('Client received: ' + event.data);
    };
    this.webSocket.onerror = function (event) {
      console.log('Client error: ', event);
    };
    this.webSocket.onclose = function (event) {
      console.log('Client connection closed: ' + event.code);
    };
  }

  disconnect(): void {
    if (this.webSocket != null) {
      this.webSocket.close();
    }
  }
}
