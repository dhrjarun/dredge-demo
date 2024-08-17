import { client } from "@/client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Movie() {
  const params = useParams();

  const { data } = useQuery({
    queryKey: ["movie", params?.id],
    queryFn: async () => {
      const id = params?.id as unknown as number;
      if (!id) return;

      const data = await client.get(`/movie/${id}`).data();
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <div>
      <h1>{data?.title}</h1>
      {data?.director && <p>{data.director}</p>}
    </div>
  );
}
