import { IncomingMessage } from "http";
import WebSocket from "ws";

//Minimal required context per request
export interface rawContext {
    data: WebSocket.Data,
    socket: WebSocket,
    request: IncomingMessage
}