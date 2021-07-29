import { BreezeMiddleware } from '../contracts/middleware'
import WebSocket, { Server as WServer } from 'ws'
import { Middleware } from 'co-compose'
import { Runnable } from 'co-compose/build/src/Runnable'
import { rawContext } from '../contracts/rawcontext'
import { IncomingMessage } from 'http'
import { ContextCreator } from '../context'

export class BreezeServer {
    //Initiate a websocket server.
    public static async init(port: number, middlewares: Array<BreezeMiddleware>): Promise<WServer>  {
        //Start a new WS server on the requested port.
        let wss: WServer = new WServer({ port })

        //Bootstrap the middleware runner.
        const middleware: Middleware = new Middleware()
        middleware.register(middlewares)
        const runner: Runnable = middleware.runner()
        
        //Listen to websocket events
        wss.on("connection", function(socket: WebSocket, request: IncomingMessage) {
            socket.on("message", function(data) {
                //Create a minimal, platform-specific context to be transformed into a Breeze-compliant ctx
                const rawCtx: rawContext = {
                    data,
                    request, 
                    socket: socket,
                }

                //A more user-friendly ctx object
                const ctx = new ContextCreator(rawCtx)
            })
        })

        return wss
    }
}