import Link from "next/link";
import { groups } from "@/components/groups/groups-data";

const Groups = () => {
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
                { "--groupColor": `#${group.color}` } as React.CSSProperties
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
      <main className="flex flex-col items-center min-h-screen mt-20 px-32 py-8 gap-5 dark:text-dark">
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
