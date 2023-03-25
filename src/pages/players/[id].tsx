import { useRouter } from "next/router";
import Image from "next/image";
import { players } from "../../components/players/users-data";
import avatar from "../../../public/images/pixie-avatar.jpeg";

export default function Player() {
  const router = useRouter();
  const { id } = router.query;
  const player = players.find((obj) => obj.id.toString() === id);

  const TermsMapper = () => {
    return (
      <>
        {player?.terms.map((term) => (
          <span key={term}>{term}</span>
        ))}
      </>
    );
  };

  return (
    <main className="flex flex-col items-center mt-20 md:mx-20 lg:mx-48 xl:mx-56 px-6 py-8 gap-2 dark:text-dark">
      <h1 className="text-2xl">{player ? player.name : "Player not found"}</h1>
      <p>Group: {player?.group}</p>
      <p>Level: {player?.level}</p>
      <p>Last Login: {player?.lastLogin}</p>
      <Image
        src={avatar}
        alt={`${player?.name}'s avatar'`}
        className="rounded"
      ></Image>
      <p>{player?.description}</p>
      <p className="flex flex-wrap gap-2">
        Terms: <TermsMapper />
      </p>
      <p>Points: {player?.points}</p>
      <p>Completed Tasks: {player?.completedTasks}</p>
      <p>Created Tasks: {player?.createdTasks}</p>
      <h2>Comments</h2>
    </main>
  );
}
