// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createNodeHttpRequestHandler } from "dredge-adapters";
import { db } from "@/db";
import { rootRouter } from "@/router";

/**
 * This is node http adapter.
 *
 * Pass the initialContext to ctx
 *
 * Do not forget the prefixUrl
 *
 *
 * Here, just like client, you can pass dataSerializers and bodyParsers.
 */
const handler = createNodeHttpRequestHandler({
  ctx: {
    db: db,
  },
  router: rootRouter,
  prefixUrl: "/api/dredge",
});

export default handler;
