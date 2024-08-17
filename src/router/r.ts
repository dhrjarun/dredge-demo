import { dredgeRoute, ValidationError } from "dredge-route";
import type { DB } from "../db.js";

/**
 * InitialContext will be passed to adapter.
 * You can access it in middlewares with `res.ctx`
 */
type InitialContext = {
  db: DB;
};

export const route = dredgeRoute<InitialContext>()
  .options({
    /**
     * dataTypes are quite important, It makes working with content-type and accept header easier.
     * You will see, how this will be used.
     */
    dataTypes: {
      json: "application/json",
      text: "text/plain",
    },
  })
  .use((req, res) => {
    /**
     *
     * These are the middlewares, that will be executed after the successful validation.
     * They are executed in order, unless you end the chain with res.end()
     */

    /**
     * req.url is `string` containing every part of the url.
     * - protocol
     * - host
     * - port
     * - path
     * - search
     * - etc
     */
    const url = req.url;

    const method = req.method;

    /**
     * req.header is a function.
     *
     * req.header("key") will return the value of the header.
     * req.header() will return all the headers.
     */
    const headers = req.header();
    const ct = req.header("content-type");

    /**
     * There is another way to check the content-type.
     *
     * if, ct is any value specified in dataTypes, req.dataType will be the corresponding value.
     * For example, if `ct` is "application/json", `dt` will be "json"
     */
    const dt = req.dataType;

    /**
     * even `res` has dataType.
     *
     * Based on request 'accept' header, it will be the corresponding value from dataTypes.
     */
    const responseDT = req.dataType;

    /**
     * Other than res.dataType, res has header, status, statusText, and data
     *
     *
     * But initially, all these will be empty, but you can set them, if you want.
     */
    const responseHeaders = res.header(); // {}
    const status = res.status; // undefined
    const statusText = res.statusText; // undefined
  })
  .use((req, res) => {
    /**
     *  Would you like to update the context?
     *  You can do it by `res.next( {ctx: {...} })` but be sure to return it.
     *
     *  you can add response headers, set status or statusText the same way.
     *  You can also add response body, but we would recommend to use `res.end()` for that, because res.next() will not provide types for the body.
     *
     */
    return res.next({
      ctx: {
        session: {
          userId: 1,
        },
      },

      headers: {
        "content-type": "application/json",
      },
      status: 200,
      statusText: "ok",
    });
  })
  .use((req, res) => {
    /**
     * Why don't you hover over `res.ctx` to see if What we did worked or not?
     */
    const updateCtx = res.ctx;

    /**
     * It will not be empty, as we have set it in the previous middleware.
     */
    const headers = res.header(); // { 'content-type': 'application/json' }
    const status = res.status; // 200
    const statusText = res.statusText; // "ok"
  })
  .error((err, req, res) => {
    /**
     *
     * This method will be executed
     * - if you throw an error in route.use(() => {})
     * - if validation fails
     *
     * You can have more than one error handler, all will be executed in order, unless you end the chain with res.end()
     */

    /**
     * You can check if the error is of type ValidationError
     * And handle accordingly...
     *
     */
    if (err instanceof ValidationError) {
    }

    return res.next({
      json: {
        err: {
          message: err?.message || "Something went wrong",
        },
      },
      status: 500,
    });
  });

/**
 * Next: Go to ./movie.ts
 */
