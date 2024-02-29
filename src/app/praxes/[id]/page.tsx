"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Praxis } from "@/types";
import Error from "@/components/Error";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import formatISODateStringCompact from "@/utils/formatDateTime";

const PraxisPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [praxis, setPraxis] = useState<Praxis | undefined>(undefined);
  const [isAuthor, setIsAuthor] = useState(false);

  // Check if user is the praxis post author
  // useEffect(() => {
  //   if (user) {
  //     if (parseInt(id) === user.groupId) {
  //       setIsPoster(true);
  //     }
  //   }
  // }, [user]);

  // Fetch & set groups
  useEffect(() => {
    id && fetchPraxis();
  }, [id]);

  const fetchPraxis = async () => {
    setError("");
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/praxis/${id}`
      );
      console.log("praxis:", data);
      setPraxis(data);
    } catch (error) {
      console.error("Failed to fetch praxis:", error);
      setError("Sorry, an error occurred fetching this praxis! Please reload.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    console.log("edit!");
  };

  return (
    <div className="mt-24 mx-6 md:mx-24 xl:mx-64 flex flex-col items-center gap-4">
      {/* Error */}
      {error && <Error message={error} setError={setError} />}
      {/* Loading */}
      {loading && (
        <div
          className="my-36 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-perse-50 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
      {!loading && praxis && (
        <>
          <div className="w-full flex justify-between">
            <div className="flex-1"></div>
            <h1 className="flex-1 text-xl font-bold">{praxis.title}</h1>
            <div className="flex-1 flex justify-end">
              {!isAuthor && (
                <button
                  className="p-1 border border-parchment-300 rounded uppercase font-bold"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>
              <Link href={`/users/${praxis.User.id}`} className="underline">
                {praxis.User.username}
              </Link>
            </span>
            <span>
              completed{" "}
              <Link href={`/tasks/${praxis.Task.id}`} className="underline">
                {praxis.Task.name}
              </Link>
            </span>
            <span>on {formatISODateStringCompact(praxis.completedAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Level: {praxis.Task.level}</span>
            <span>Points: {praxis.Task.points}</span>
          </div>
          <p>{praxis.description}</p>
        </>
      )}
    </div>
  );
};

export default PraxisPage;
