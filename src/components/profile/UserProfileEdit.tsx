import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield, faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { UserData } from "@/types";
import groupIconMapper from "@/components/GroupIcons";
import avatarPin from "../../../public/pin-full.png";
import {
  ArrowUpRightIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface UpdateUserPayload {
  description?: string;
  terms?: string[];
}

interface UserProfileEditProps {
  userData: UserData;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setShouldRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserProfileEdit: React.FC<UserProfileEditProps> = ({
  userData,
  setIsEditing,
  setLoading,
  setError,
  setShouldRefetch,
}) => {
  const { user } = useUser();
  const [description, setDescription] = useState(userData?.description || "");
  const [terms, setTerms] = useState(
    Array.isArray(userData?.terms) ? userData.terms : ["test", "por exemplo"]
  );
  const [deletingTerm, setDeletingTerm] = useState(false);
  const [newTerm, setNewTerm] = useState("");

  // Add new term
  const handleAddTerm = () => {
    if (newTerm && !terms.includes(newTerm)) {
      setTerms([...terms, newTerm]);
      setNewTerm(""); // Reset input field after adding
    }
  };

  // Delete term
  const handleDeleteTerm = (index: number) => {
    // Avoid chance of user clicking too fast and misaligning indeces of items to delete
    setDeletingTerm(true);
    // Create a new array that filters out the term at the given index
    const newTerms = terms.filter((_, termIndex) => termIndex !== index);
    setTerms(newTerms);
    setDeletingTerm(false);
  };

  // Handle submit
  const handleSubmit = async () => {
    try {
      // Get user ID
      const userId = user?.id;
      if (!userId) {
        throw new Error("Unable to get user ID.");
      }
      // Create payload to send
      const payload: UpdateUserPayload = {};

      if (description) {
        payload.description = description;
      }

      if (terms && terms.length > 0) {
        payload.terms = terms;
      }

      if (!payload) {
        throw new Error("No data provided to update profile.");
      }
      setLoading(true);
      console.log("description, terms:", description, terms);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`,
        payload,
        {
          withCredentials: true,
        }
      );
      setShouldRefetch((prev) => !prev);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(
          err.message ||
            "Something went wrong updating your profile. Please retry/refresh."
        );
      } else {
        setError(
          "Something went wrong updating your profile. Please retry/refresh."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col p-8 gap-10 bg-perse-400/60 rounded-3xl border border-perse-50">
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
                <Link href="/groups" target="_blank" rel="noopener noreferrer">
                  <button className="flex items-center bg-turquoise-500 hover:bg-turquoise-600 border border-turquoise-600 hover:border-turquoise-700 text-base py-1 px-2 rounded-lg">
                    Choose Group
                    <ArrowUpRightIcon className="h-3 w-3 ml-1" />
                  </button>
                </Link>
              ) : (
                <>
                  {groupIconMapper[userData.groupId]}
                  <span>{userData?.groupName}</span>
                  <Link
                    href="/groups"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="flex items-center bg-turquoise-500 hover:bg-turquoise-600 border border-turquoise-600 hover:border-turquoise-700 text-base py-1 px-2 rounded-lg">
                      Reconsider Group
                      <ArrowUpRightIcon className="h-3 w-3 ml-1" />
                    </button>
                  </Link>
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
          <button disabled title="Already in edit mode" className="flex">
            <PencilIcon className="h-5 w-5 opacity-30" />
          </button>
        ) : (
          <div className="flex gap-4">
            <FontAwesomeIcon icon={faShield} size="2x" />
            <FontAwesomeIcon icon={faSkullCrossbones} size="2x" />
          </div>
        )}
      </div>
      {/* Terms */}
      <div className="flex flex-col gap-2">
        <span className="font-bold opacity-80">Terms</span>
        <div className="flex items-center my-2">
          <div className="flex overflow-hidden border border-gray-700 rounded bg-opacity-70 bg-gray-800 focus-within:border-turquoise-400 focus-within:ring-1 focus-within:ring-turquoise-500">
            <input
              type="text"
              value={newTerm}
              onChange={(e) => setNewTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTerm()}
              placeholder="Tags that sum you UP 👊"
              className="flex-1 bg-transparent p-2 text-white placeholder-parchment-200 placeholder-opacity-50 focus:outline-none"
            />
            <button
              onClick={handleAddTerm}
              title="Add term (finalized on CONFIRM)"
              className="px-3 bg-turquoise-500 font-bold text-xl hover:bg-turquoise-600"
            >
              +
            </button>
          </div>
        </div>
        {terms.length > 0 && (
          <div className="flex flex-wrap gap-4 w-full">
            {terms.map((term, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-full bg-turquoise-400 border-2 border-turquoise-400 text-stone-200 pl-4 font-medium"
                >
                  <span>{term}</span>
                  <button
                    className="flex items-center p-2 bg-turquoise-600 h-full rounded-full rounded-l-none cursor-pointer"
                    disabled={deletingTerm}
                    onClick={() => handleDeleteTerm(index)}
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Self-description */}
      <div>
        <label htmlFor="description" className="font-bold opacity-80">
          Self-Description
        </label>
        <textarea
          id="description"
          className="w-full mt-4 p-2 border border-gray-700 rounded bg-opacity-70 bg-gray-800 font-normal placeholder-parchment-200 placeholder-opacity-50 focus:outline-none focus:border-perse-300 focus:ring focus:ring-perse-50"
          value={description}
          rows={6}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Don't have an existential crisis! You're you. That's definitely someone. Probably."
        />
      </div>
      {/* Action buttons */}
      <div className="flex justify-end gap-4">
        <button
          className="bg-gray-700 hover:bg-gray-800 border border-gray-800 hover:border-gray-900 font-bold py-2 px-4 rounded-3xl uppercase"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-turquoise-500 hover:bg-turquoise-600 border border-turquoise-600 hover:border-turquoise-700 font-bold py-2 px-4 rounded-3xl uppercase"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default UserProfileEdit;
