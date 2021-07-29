import { Server } from 'ws';
import { BreezeMiddleware } from './contracts/middleware';

export class Breeze {

    //The Node WS Server.
    public server: Server

    //The middleware stack
    public middlewareStack: Array<BreezeMiddleware> = []

    //Add middleware to the middleware stack
    public use(middleware: BreezeMiddleware): void {
        this.middlewareStack.push(middleware)
    }
}