import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
// import { groups } from "@/components/groups/groups-data";

interface Group {
  id: number;
  name: string;
  description: string;
  color_primary: string;
  color_secondary: string;
}

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  async function getAllGroups() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/groups`,
        { withCredentials: false }
      );
      setGroups(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllGroups();
  }, []);

  if (groups === null) return <>Loading...</>;

  const GroupMapper = () => {
    return (
      <>
        {groups.map((group) => {
          const truncatedDesc =
            group.description.length > 300
              ? group.description.slice(0, 300).concat("...")
              : group.description;
          return (
            <Link
              href={`/groups/${group.id}`}
              key={group.id}
              className="flex flex-col items-center gap-2 p-4 border-2 rounded hover-border-color dark:hover:bg-slate-700 dark:text-dark dark:bg-slate-800"
              style={
                {
                  "--groupColor": `#${group.color_primary}`,
                } as React.CSSProperties
              }
            >
              <h3 className="font-bold text-lg">{group.name}</h3>
              <p>{truncatedDesc}</p>
            </Link>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <main className="flex flex-col items-center mt-20 px-8 md:px-32 py-8 gap-5 dark:text-dark">
        <h2 className="text-2xl">Groups</h2>
        <p>Explore the available groups to join or gently belittle.</p>
        <div className="flex flex-col gap-4">
          <GroupMapper />
        </div>
      </main>
    </div>
  );
};
export default Groups;
