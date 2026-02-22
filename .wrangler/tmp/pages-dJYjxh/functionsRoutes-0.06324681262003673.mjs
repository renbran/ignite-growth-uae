import { onRequest as __api_webhook_transformer_ts_onRequest } from "D:\\RUNNING APPS\\website\\ignite-growth-uae\\functions\\api\\webhook-transformer.ts"
import { onRequest as __webhook_transformer_ts_onRequest } from "D:\\RUNNING APPS\\website\\ignite-growth-uae\\functions\\webhook-transformer.ts"
import { onRequest as ___middleware_ts_onRequest } from "D:\\RUNNING APPS\\website\\ignite-growth-uae\\functions\\_middleware.ts"

export const routes = [
    {
      routePath: "/api/webhook-transformer",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_webhook_transformer_ts_onRequest],
    },
  {
      routePath: "/webhook-transformer",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__webhook_transformer_ts_onRequest],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_ts_onRequest],
      modules: [],
    },
  ]