import { Server } from 'ws';
import { BreezeMiddleware } from './contracts/middleware';

export class Breeze {
    constructor(port: number) {
        this.wss = new Server({ port })
    }

    //The Node WS Server.
    public wss: Server

    //The middleware stack
    public middlewareStack: Array<BreezeMiddleware> = []

    //Add middleware to the middleware stack
    public use(middleware: BreezeMiddleware): void {
        this.middlewareStack.push(middleware)
        this.wss.on("connection", (ws) => {
            ws.emit
        })
    }
}