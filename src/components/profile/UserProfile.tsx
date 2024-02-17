import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield, faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { UserData } from "@/types";
import groupIconMapper from "@/components/GroupIcons";
import avatarPin from "../../../public/pin-full.png";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

const UserProfile: React.FC<{ userData: UserData }> = ({ userData }) => {
  const { user } = useUser();

  useEffect(() => {
    console.log("user:", user);
  }, [user]);

  return (
    <div className="w-full flex flex-col p-8 gap-8 bg-perse-400/60 rounded-3xl border border-perse-50">
      <div className="flex justify-between w-full">
        <div className="flex gap-4">
          {/* Avatar */}
          <div>
            <Image
              src={avatarPin}
              alt="Antique pin representing user avatar"
              width="120"
              height="120"
            />
          </div>
          {/* Name & stats */}
          <div className="flex flex-col gap-4 text-lg font-medium">
            <p className="font-bold text-xl">{userData?.username}</p>
            <div className="flex gap-2 items-center">
              {!userData?.groupName || !userData.groupId ? (
                <span className="opacity-70 font-normal">
                  This forlorn player has no group. 🍃
                </span>
              ) : (
                <>
                  {groupIconMapper[userData.groupId]}
                  <span>{userData?.groupName}</span>
                </>
              )}
            </div>
            <p>
              Level {userData?.level || "0"} / {userData?.points || "0"} Points
            </p>
          </div>
        </div>
        {/* Friend/foe or Edit */}
        {user?.id === userData.id ? (
          <>
            <PencilIcon className="h-5 w-5" />
          </>
        ) : (
          <div className="flex gap-4">
            <FontAwesomeIcon icon={faShield} size="2x" />
            <FontAwesomeIcon icon={faSkullCrossbones} size="2x" />
          </div>
        )}
      </div>
      {/* Terms */}
      {Array.isArray(userData?.terms) && userData.terms.length > 0 && (
        <div className="flex flex-wrap gap-4 w-full">
          {userData.terms.map((term, index) => {
            return (
              <div
                key={index}
                className="rounded-full bg-turquoise-400 text-stone-200 px-4 py-1 font-medium"
              >
                {term}
              </div>
            );
          })}
        </div>
      )}
      {/* Self-description */}
      <div>
        {userData?.description || (
          <p className="opacity-70 font-normal">
            Oh sad, sad, very sad indeed: this player has no personality...
          </p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
