import { client } from "./index";

/**
 * Previous: Go to ./movie.ts
 */

async function getEventByDateString(date: string) {
  const event = await client.get(`/events/${date}`).data();
}

async function getEventByDate(date: Date) {
  /**
   * You can pass Date to `date` param.
   *
   * Path will be `events/${data.toISOString()}`
   *
   * On server, based on the param schema, it will be parsed to corresponding object.
   */
  const event = await client
    .get(":/events/:date", {
      params: {
        date: new Date("2022-01-01"),
      },
    })
    .data();
}

/**
 * Next[adapters]: Go to ../pages/api/dredge/[...dredge].ts
 */
