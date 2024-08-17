import { dredgeRouter } from "dredge-route";
import { movieRouter } from "./movie";
import { route } from "./r";
import { eventsRouter } from "./events";

/**
 * rootRouter will be passed to adapter to server the request.
 *
 * RootRouter (type) will be passed to client to provide types for the client.
 *
 */
export const rootRouter = dredgeRouter([
  movieRouter,
  eventsRouter,

  route
    .path("/hello-world")
    .get()
    .use((req, res) => {
      return res.end({
        data: "hello-world",
        headers: {
          "content-type": "text/plain",
        },
      });
    })
    .build(),
]);

export type RootRouter = typeof rootRouter;

/**
 * Go to ./r.ts
 */
