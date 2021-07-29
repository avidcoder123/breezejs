import { Context } from "./context"

export type BreezeMiddleware = (ctx: Context) => Promise<void>