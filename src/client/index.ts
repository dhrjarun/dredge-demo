import { dredgeFetch } from "dredge-fetch";
import type { RootRouter } from "../router";

/**
 * Previous: Go to ../router
 */

/**
 * Get the RootRouter type, This will provide the types for the client.
 *
 * Be sure to pass the prefixUrl, otherwise it will throw an error.
 *
 * DataTypes are important in client as well.
 *
 */
export const client = dredgeFetch<RootRouter>().extends({
  prefixUrl: "http://localhost:3000/api/dredge",
  dataTypes: {
    json: "application/json",
    text: "text/plain",
  },
});

/**
 * There you go, you can use the client now.
 *
 * client(PATH, OPTIONS)
 * clint.get(PATH, OPTIONS)
 * client.post(PATH, OPTIONS)
 * client.put(PATH, OPTIONS)
 * client.patch(PATH, OPTIONS)
 * client.delete(PATH, OPTIONS)
 *
 * client.extends(EXTENSIONS) to build a new client on top of the existing one.
 *
 */

/**
 * Next(optional): Proceed Below
 * Next: Go to ./movie.ts
 */

const extendedClient = client.extends({
  /**
   * By default, client has 'application/json' and 'text/plain' dataSerializers.
   *
   * You can add new dataSerializers here.
   */
  dataSerializers: {
    "application/yaml": (options) => {
      return "";
    },
    "multipart/form-data": (options) => {
      return "";
    },

    "image/*": (options) => {
      return "";
    },
  },

  /**
   * By default, client has 'application/json' and 'text/plain' bodyParsers.
   *
   * You can add new bodyParsers here.
   */
  bodyParsers: {
    "application/yaml": (options) => {
      return "";
    },
    "multipart/form-data": (options) => {
      return "";
    },

    "image/*": (options) => {
      return "";
    },
  },
});
