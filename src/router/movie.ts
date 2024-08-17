import { dredgeRouter } from "dredge-route";
import { route } from "./r";
import z from "zod";

/**
 * Previous: Go to ./r.ts
 */

const GetMovies = route
  /**
   * Define your path
   */
  .path("/movie")
  /**
   * Define your method.
   */
  .get()
  /**
   * Define searchParams
   * You can use `string`, `number`, `boolean`, `date`.
   * Do not use `object` or `array` here.
   *
   * You can have them optional as well.
   *
   * If it is not optional, you will get validation error if it does not receive at least one value.
   */
  .searchParams({
    skip: z.number().optional(),
    limit: z.number().optional(),

    ids: z.number().optional(),
  })
  .use((req, res) => {
    /**
     * let's get the DB from the context
     */
    const db = res.ctx.db;

    /**
     * Let's access the searchParams
     *
     * If you want single value, use `req.searchParam("key")`
     * If you want multiple values, use `req.searchParams("key")`
     *
     * Hover to see the type.
     *
     * Why don't you find out what `req.searchParm()` and `req.searchParams()` return? [yeah! without the argument]
     */
    const skip = req.searchParam("skip");
    const limit = req.searchParam("limit");
    const ids = req.searchParams("ids");

    /**
     * When passing body, always be sure to use res.end() instead of res.next().
     * If You use res.next(), you will not get the type inference.
     */
    return res.end({
      status: 200,
      statusText: "ok",

      /**
       * I told you, dataTypes are important.
       *
       * Any key specified in dataTypes can be used to pass the body. The value of the key will be the content-type header.
       *
       * One more thing, this is not body you are passing, it is data, which will be stringified to generate the body.
       *
       */
      json: db.movie.getAll(),
    });
  })
  /**
   * Be sure to build the route.
   */
  .build();

const GetMovieById = route
  /**
   * Here, :id is a param.
   */
  .path("/movie/:id")
  /**
   * You can validate [if you want] params with zod or SuperStruct or Yup.
   */
  .params({
    id: z.number(),
  })
  .get()
  .use((req, res) => {
    /**
     * This is how you access params.
     * Want to access all the params? Use `req.params()`
     *
     * Hover over `id` to see the type.
     */
    const id = req.param("id");

    return res.end({
      json: res.ctx.db.movie.getById(id),
      status: 200,
    });
  })
  .build();

const createMovie = route
  .path("/movie")
  /**
   * In post, patch, put you can pass the schema of the body.
   */
  .post(
    z.object({
      id: z.number(),
      title: z.string(),
      year: z.number(),
      director: z.string(),
      genre: z.string(),
    })
  )
  .use((req, res) => {
    /**
     * That is how you access the body, wait a second, it is data, not body.
     * Yeah, you won't see body in here, data is parsed version of body.
     *
     * Hover over `movie` to see the type.
     */
    const movie = req.data;

    const id = 1;
    res.ctx.db.movie.create({
      ...movie,
    });

    return res.end({
      /**
       * Instead of json, you can use `data` and add content-type header.
       */
      json: {
        id,
      },

      status: 201,
      statusText: "created",
    });
  })
  .build();

const DeleteMovieById = route
  .path("/movie/:id")
  .params({
    id: z.number(),
  })
  .delete()
  .use((req, res) => {
    const id = req.param("id");
    res.ctx.db.movie.deleteById(id);

    return res.end({
      status: 200,
      statusText: "ok",
    });
  })
  .build();

/**
 * This is how you combine routes to build a router.
 */
export const movieRouter = dredgeRouter([
  GetMovies,
  GetMovieById,
  createMovie,
  DeleteMovieById,
]);

/**
 * Next(optional): Go to ./events.ts
 * Next: Go to ../client
 */
