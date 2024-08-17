import { client } from "./index";

async function getMovies() {
  /**
   * Why don't you delete from line 10 to 12 and type it by yourself?
   *
   * you see, all the types are there, You don't need to remember the path.
   *
   */
  client("/movie", {
    method: "get",
  });

  /**
   * Not just path has type-safety, searchParams also has it.
   *
   * You can pass single value or multiple values.
   *
   * searchParams is optional, because all the searchParams are optional as defined in the route.
   *
   * For this, url will be /movie?skip=1&ids=1&ids=2&ids=3
   */
  client("/movie", {
    method: "get",
    searchParams: {
      limit: 1,
      skip: [1],
      ids: [1, 2, 3],
    },
  });

  /**
   * response here is extend of `global.Response` of fetch.
   * You can access the status, statusText, headers just like with fetch response.
   *
   * But, how about data[the parsed body]?
   * Hove over `data` to see the type.
   */
  const response = await client("/movie", {
    method: "get",
    searchParams: {
      skip: 1,
      ids: [1, 2, 3],
    },
  });
  let data = await response.data();

  /**
   * You don't have to await the response, but you can access the data from the Promise<Response> directly.
   */
  data = await client.get("/movie").data();

  /**
   * Not just that, I told you how important dataTypes are:
   * .json() will add the accept header to 'application/json' or whatever you specified and return the data
   * so you can use .yaml() or .xml() but be sure to specify the dataTypes first.
   *
   * You do not have access to these dataType method, if you await the response, since by then request has already been sent.
   */
  data = await client.get("/movie").json();
}

async function getMovieById() {
  /**
   * Place the id where id need to be in the path.
   *
   * Hover over `data` to see the type.
   */
  let data = await client.get("/movie/1").data();

  /**
   * This is another way
   *
   * If you want to pass the params separately, Path need to start with `:` and params field need to be correct.
   *
   */
  data = await client
    .get(":/movie/:id", {
      params: {
        id: 1,
      },
    })
    .data();

  /**
   * Same as above.
   */
  data = await client(":/movie/:id", {
    params: {
      id: 1,
    },
    method: "get",
  }).data();
}

async function createMovie() {
  /**
   * Data can be passed with either `data` field or `json` field or whatever you specified in the dataTypes.
   *
   * Here, you do not need to specify the content-type header.
   *
   * And of course, you get the type-safety.
   */
  client("/movie", {
    method: "post",

    json: {
      id: 1,
      title: "title",
      year: 2000,
      director: "director",
      genre: "genre",
    },
  });

  /**
   * When using `data` field, you can pass the `dataType` instead of content-type header.
   *
   * Why don't you see, what else can be passed to `dataType`?
   */
  client("/movie", {
    method: "post",
    data: {
      id: 1,
      title: "title",
      year: 2000,
      director: "director",
      genre: "genre",
    },

    dataType: "json",
  });
}

/**
 * By default, client will throw httpError if the response status is not 2xx.
 * You can change this behavior by passing `throwHttpError` option.
 *
 * But, we recommend not to do that..
 */

/**
 * Next(Optional): Go to ./event.ts
 * Next[adapters]: Go to ../pages/api/dredge/[...dredge].ts
 */
