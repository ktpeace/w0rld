"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield, faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@/context/UserContext";
import avatarPin from "../../../../public/pin-full.png";
import Error from "@/components/Error";
import groupIconMapper from "@/components/GroupIcons";

const UserPage = () => {
  const { user, setUser } = useUser();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userIdString = user!.id.toString();
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userIdString}`
        );
        console.log("user:", res, res.data);
        setUserData(res.data);
      } catch (err) {
        console.error(err);
        setError(
          "Sorry, something went wrong fetching the user data. Please reload and/or pray like there's no tomorrow (mileage may vary). ⚡"
        );
      } finally {
        setLoading(false);
      }
    };

    user?.id && fetchUser();
  }, [user]);

  return (
    <>
      {/* Error */}
      {error && <Error message={error} />}
      {/* Loading */}
      {loading && (
        <div
          className="mt-36 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-perse-50 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
      {!loading && user && (
        <div className="flex flex-col items-center my-24 mx-6 md:mx-24 xl:mx-64">
          <section className="">
            <div className="flex">
              {/* Avatar */}
              <div>
                <Image
                  src={avatarPin}
                  alt="Antique pin representing user avatar"
                  width="60"
                  height="60"
                />
              </div>
              {/* Name & stats */}
              <div className="flex flex-col">
                <p className="font-bold">{user.username}</p>
                <div>
                  {groupIconMapper[user.groupId]} University of Aesthematics
                </div>
                <p>
                  Level {user.level || "0"} / {user.points || "0"} Points
                </p>
              </div>
              {/* Friend/foe */}
              <div>
                <FontAwesomeIcon icon={faShield} />
                <FontAwesomeIcon icon={faSkullCrossbones} />
              </div>
            </div>
            {/* Terms */}
            <div>
              <div></div>
            </div>
            {/* Self-description */}
            <div>
              <div>{user.description}</div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default UserPage;

// createdAt: "2024-02-11T20:34:44.000Z";
// description: null;
// flags: 0;
// groupId: null;
// id: 58;
// imagePath: null;
// isBanned: false;
// level: 0;
// location: null;
// points: 0;
// terms: null;
// username: "katchan";
// votes: 0;
