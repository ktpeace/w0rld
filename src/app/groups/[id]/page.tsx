"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Group } from "@/types";
import Error from "@/components/Error";
import { useUser } from "@/context/UserContext";

const GroupPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [group, setGroup] = useState<Group | undefined>(undefined);
  const [isMember, setIsMember] = useState(false);

  // Check if user is a member of this group
  useEffect(() => {
    if (user) {
      if (parseInt(id) === user.groupId) {
        setIsMember(true);
      }
    }
  }, [user, id]);

  // Fetch & set groups
  useEffect(() => {
    id && fetchGroup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchGroup = async () => {
    setError("");
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/${id}`
      );
      console.log("group:", data);
      setGroup(data);
    } catch (error) {
      console.error("Failed to fetch group:", error);
      setError("Sorry, an error occurred fetching this group! Please reload.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    try {
      setLoading(true);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/group/join/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      setIsMember(true);
    } catch (err) {
      console.error(err);
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 409) {
        setError("You're already a member of another group!");
      } else {
        setError(
          "An error occurred joining! Refresh and give 'er another go..."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDepart = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/group`,
        {
          withCredentials: true,
        }
      );
      setIsMember(false);
    } catch (err) {
      console.error(err);
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 409) {
        setError("You're not a member of a group!");
      } else {
        setError(
          "An error occurred leaving them! Refresh and give 'er another go..."
        );
      }
    } finally {
      setLoading(false);
    }
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
      {!loading && group && (
        <>
          <div className="w-full flex justify-between">
            <div className="flex-1"></div>
            <h1 className="flex-1 text-xl font-bold">{group.name}</h1>
            <div className="flex-1 flex justify-end">
              {!isMember && (
                <button
                  className="p-1 border border-parchment-300 rounded uppercase font-bold"
                  onClick={handleJoin}
                >
                  Join
                </button>
              )}
              {isMember && (
                <button
                  className="p-1 border border-parchment-300 rounded uppercase font-bold"
                  onClick={handleDepart}
                >
                  Depart
                </button>
              )}
            </div>
          </div>
          <p>{group.description}</p>
        </>
      )}
    </div>
  );
};

export default GroupPage;
