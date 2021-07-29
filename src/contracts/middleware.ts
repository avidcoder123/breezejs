import { Context } from "./context"

export type BreezeMiddleware = (ctx: Context, next: Promise<void>) => Promise<void>