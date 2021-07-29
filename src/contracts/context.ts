export interface Context {
    socket: {
        send: <T>(data: T) => void
    }
}