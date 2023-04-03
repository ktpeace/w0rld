import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import UserContext from "@/components/userContext";
import Image from "next/image";
import avatar from "../../../../public/images/pixie-avatar.jpeg";
import axios from "axios";

export default function Player() {
  const router = useRouter();
  const { id } = router.query;
  const { user, setUser } = useContext(UserContext);

  interface Player {
    created_at: string;
    description: string;
    email: string;
    group_id: number;
    image_path: string;
    last_login: string;
    level: number;
    points: number;
    terms: string[];
    username: string;
  }

  const [player, setPlayer] = useState<Player | null>(null);

  const getPlayer = async () => {
    if (id) {
      try {
        // const response = await axios.get("http://localhost:5000/api/user", {
        const response = await axios.get(
          "https://w0rld-zero-api.com/api/user",
          {
            params: { userId: id },
          }
        );
        const player = response?.data.message;
        player && setPlayer(player);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data.error) {
          console.log(error.response.data.error);
        } else {
          console.log(`Error: ${error}`);
        }
      }
    }
  };

  useEffect(() => {
    getPlayer();
  }, [id]);

  const handleEditProfile = () => {
    router.push(`${id}/edit`);
  };

  const handleLogout = async () => {
    setUser("");
    localStorage.clear();
    if (id) {
      try {
        // const response = await axios.post("http://localhost:5000/api/logout", {
        const response = await axios.post(
          "https://w0rld-zero-api.com/api/logout",
          {
            userId: id,
          }
        );
        if (response.status === 200) {
          router.push("/");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data.error) {
          const errorMessage = error.response.data.error;
          if (errorMessage === "Error clearing cookies.") {
            alert(
              "User is logged out, but unfortunately there was a server error clearing cookies. If you wish, you can visit your browser settings to clear them manually. (The next time you log in, your cookies will be reset regardless.)."
            );
          } else {
            // The below may be worse than saying nothing (security-wise)
            // Instead, if refresh tokens are not deleted properly, I should be automatically notified personally (by email or via Vercel or AWS if that is possible)
            console.error("Error deleting refresh token from database.");
          }
        }
      }
    } else {
      // This is another case for me to get notified
    }
  };

  const TermsMapper = () => {
    return (
      <>
        {player?.terms?.map((term) => (
          <span key={term}>{term}</span>
        ))}
      </>
    );
  };

  return (
    <main className="flex flex-col items-center mt-20 md:mx-20 lg:mx-48 xl:mx-56 px-6 py-8 gap-2 dark:text-dark">
      <h1 className="text-2xl">
        {player ? player.username : "Player not found"}
      </h1>
      <p>Group: {player?.group_id}</p>
      <p>Level: {player?.level}</p>
      <p>Last Login: {player?.last_login}</p>
      <Image
        src={avatar}
        alt={`${player?.username}'s avatar'`}
        className="rounded"
      ></Image>
      {user && player && player.username === user && (
        <>
          <button className="border rounded p-1" onClick={handleEditProfile}>
            Edit Profile
          </button>
          <button onClick={handleLogout} className="border rounded p-1">
            Log Out
          </button>
        </>
      )}
      <p>{player?.description}</p>
      <p className="flex flex-wrap gap-2">
        Terms: <TermsMapper />
      </p>
      <p>Points: {player?.points}</p>
      <p>Completed Tasks: </p>
      <p>Created Tasks: </p>
      <h2>Comments</h2>
    </main>
  );
}
