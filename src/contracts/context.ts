import { Observable } from 'rxjs'

export interface Context {
    socket: {
        send: <T>(data: T) => void,
        sendObservable: <T>(data: Observable<T>) => void,
        url: string,
        data: string,
        ip?: string,
        
    }
}