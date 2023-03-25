import { useRouter } from "next/router";
import { groups } from "@/components/groups/groups-data";

export default function Group() {
  const router = useRouter();
  const { id } = router.query;
  const group = groups.find((obj) => obj.id.toString() === id);
  const { name = "", color = "", color2 = "", description = "" } = group || {};

  const formattedDescription = description.split("\n").map((line, i) => (
    <div key={i}>
      {line}
      <br />
    </div>
  ));

  return (
    <main className="flex flex-col items-center mt-20 px-12 md:px-32 py-8 gap-5 dark:text-dark">
      <h2 className="text-2xl text-center">{name}</h2>
      <p>{formattedDescription}</p>
    </main>
  );
}
