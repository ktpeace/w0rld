import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { players } from "../../components/players/users-data";
import avatar from "../../../public/images/pixie-avatar.jpeg";
import { useEffect, useState } from "react";
// todo: change outside border color/thickness if someone is friend or foe

interface Player {
  id: number;
  name: string;
  description: string;
  color_primary: string;
  color_secondary: string;
  level: number;
  points: number;
  terms: string;
  image_path: string;
  created_at: Date;
  last_login: Date;
  location: string;
  group_id: number;
  group_name: string;
}

const PlayerMapper = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  async function getAllPlayers() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
        { withCredentials: false }
      );
      setPlayers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllPlayers();
  }, []);

  if (!players) return <p>Unable to retrieve players</p>;

  console.log(players);

  return (
    <>
      {players.map((player) => {
        console.log(player);
        const truncateDesc =
          player.description && player.description.length > 50
            ? player.description.slice(0, 50).concat("...")
            : player.description;
        return (
          <Link
            href={`/players/${player.id}`}
            key={player.id}
            className="flex flex-col items-center p-0 sm:p-1 w-36 md:w-44 gap-1.5 rounded border-2 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-500 dark:hover:bg-slate-700"
          >
            <h3 className="flex flex-col items-center player-name uppercase font-bold">
              <span className="text-center break-all">
                L{player.level} {player.name}
              </span>
            </h3>
            <h4 className="uppercase text-center text-xs font-bold dark:text-slate-400">
              {player.group_name}
            </h4>
            <Image
              src={avatar}
              alt="avatar"
              className="w-[100px] h-[100px] rounded"
            />
            <p className="text-sm font-serif dark:text-slate-300 text-center">
              {truncateDesc}
            </p>
          </Link>
        );
      })}
    </>
  );
};

const Players = () => {
  return (
    <main className="flex flex-col items-center mt-20 md:mx-20 lg:mx-48 px-6 py-8 gap-5 dark:text-dark">
      <h1 className="text-2xl">Players</h1>
      <p>View other players.</p>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-12">
        <PlayerMapper />
      </div>
    </main>
  );
};

export default Players;
