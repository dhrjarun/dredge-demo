import { dredgeRouter } from "dredge-route";
import { route } from "./r";
import z from "zod";

/**
 * Previous: Go to ./movie.ts
 */

const GetEvents = route
  .path("/events")
  .get()
  .use((req, res) => {
    return res.end({
      json: res.ctx.db.events.getAll(),
      status: 200,
    });
  })
  .build();

const GetEventByDate = route
  .path("/events/:date")
  .params({
    /**
     * Yeah! you can use date as a param.
     */
    date: z.date(),
  })
  .get()
  .use((req, res) => {
    const date = req.param("date");
    return res.end({
      json: res.ctx.db.events.getByDate(date.toISOString().split("T")[0]),
      status: 200,
    });
  })
  .build();

export const eventsRouter = dredgeRouter([GetEvents, GetEventByDate]);

/**
 * Next: Go to ../client
 */
