import { Observable } from "rxjs";
import { Context } from "../contracts/context";
import { rawContext } from "../contracts/rawcontext";
import { rawData } from "../contracts/rawdata";


export class ContextCreator implements Context {
    constructor(raw: rawContext) {
        this.rawCtx = raw
        let rawdata: rawData = JSON.parse(this.rawCtx.data.toString())
        this.socket = {

                //Send a message across WS.
                send: <T>(data: T): void => {
                    this.rawCtx.socket.send({
                        data,
                        rid: rawdata.rid
                    })
                },
        
                //Subscribe to an observable and send a message every time it emits
                sendObservable: <T>(observable: Observable<T>): void => {
                    observable.subscribe((data: T) => this.rawCtx.socket.send({
                        data,
                        rid: rawdata.rid
                    }))
                },
        
                //The url of the WS request.
                url: this.rawCtx.socket.url,
        
                //The request payload.
                data: rawdata.data,

                //Remote IP.
                ip: this.rawCtx.request.socket.remoteAddress
                || (this.rawCtx.request.headers['x-forwarded-for'] as string).split(',')[0].trim()
                || undefined,

                //Request identifier. An SHA-256 hash of the client IP and the Unix date.
                rid: rawdata.rid,

                /*Identifies whether the request will emit a single response or an 
                observable. This is not enforced by Breeze. Breeze does not use this value but it
                can be useful for type-specific routing and ensures type safety on the client
                side.*/
                type: rawdata.type

            }
        }

    public rawCtx: rawContext

    public socket: Context["socket"]
    
}