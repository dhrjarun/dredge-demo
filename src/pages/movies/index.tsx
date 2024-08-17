import { client } from "@/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Movies() {
  const { data } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const data = await client.get("/movie").data();
      console.log("data", data);
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <div>
      <h1>Movies</h1>
      {data?.map((movie) => (
        <div
          key={movie.id}
          className="border-gray-300 border rounded-md m-2 p-2"
        >
          <h2>{movie.title}</h2>
          <p>{movie.director}</p>
        </div>
      ))}
    </div>
  );
}
