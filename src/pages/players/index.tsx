import Link from "next/link";
import Image from "next/image";
import { players } from "../../components/players/users-data";
// import { groups } from "../../components/groups/groups-data";
import avatar from "../../../public/images/pixie-avatar.jpeg";

// todo: change outside border color/thickness if someone is friend or foe

const PlayerMapper = () => {
  return (
    <>
      {players.map((player) => (
        <Link
          href={`/players/${player.id}`}
          key={player.id}
          className="flex flex-col items-center p-1 w-36 gap-1.5 rounded border-2 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-500 dark:hover:bg-slate-700"
        >
          <h3 className="player-name uppercase font-bold">
            <span className="player-level">{player.level}</span> {player.rank}{" "}
            {player.name}
          </h3>
          <h4 className="player-subheader uppercase text-xs font-bold dark:text-slate-400">
            {player.group}
          </h4>
          <Image
            src={avatar}
            alt="avatar"
            className="w-[100px] h-[100px] rounded"
          />
          <p className="player-desc text-sm font-serif dark:text-slate-300 text-center">
            {player.description}
          </p>
        </Link>
      ))}
    </>
  );
};

const Players = () => {
  return (
    <main className="flex flex-col items-center min-h-screen mt-20 md:mx-20 lg:mx-48 xl:mx-56 px-6 py-8 gap-5 dark:text-dark">
      <h1 className="text-2xl">Players</h1>
      <p>View other players.</p>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-12">
        <PlayerMapper />
      </div>
    </main>
  );
};

export default Players;
