"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import axios from "axios";
// import { useUser } from "@/context/UserContext";
import Error from "@/components/Error";
import { UserData } from "@/types";
import watercolorBg from "../../../../public/gpt-dalle-bg-watercolor.webp";
// import UserTasks from "@/components/profile/UserTasks";
import UserProfile from "@/components/profile/UserProfile";
import UserProfileEdit from "@/components/profile/UserProfileEdit";

const UserPage = () => {
  // Get any logged-in user
  // const { user, setUser } = useUser();
  // Get profile page user ID
  const pathname = usePathname();
  const pageUserId = pathname.split("/").pop();
  // Set profile page user info
  const [userData, setUserData] = useState<UserData | null>(null);
  // Set visible content based on tab
  const [activeTab, setActiveTab] = useState("profile");
  // Profile edits
  const [isEditing, setIsEditing] = useState(false);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  // Generic setters
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // const userIdString = user!.id.toString();
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${pageUserId}`
        );
        console.log("userData:", res.data);
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

    pageUserId && fetchUser();
  }, [pageUserId, shouldRefetch]);

  const handleTabClick = (tabName: string) => {
    setError("");
    setActiveTab(tabName);
  };

  return (
    <>
      {/* Background image */}
      <div className="absolute inset-0 z-[-5] overflow-hidden">
        <Image
          src={watercolorBg}
          alt="Background image of abstract rainbow watercolors"
          quality={100}
          fill
          sizes="100vw"
          className="opacity-20 object-cover"
        />
      </div>
      {/* Tab Selection */}
      <div className="fixed left-0 mt-24 z-10">
        <div className="bg-perse-400/60 rounded-r-lg border border-perse-50 py-4">
          <nav className="flex flex-col items-start gap-6 font-sans">
            <button
              onClick={() => handleTabClick("profile")}
              className={`px-4 ${
                activeTab === "profile" ? "font-bold" : "opacity-70"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => handleTabClick("tasks")}
              className={`px-4 ${
                activeTab === "tasks" ? "font-bold" : "opacity-70"
              }`}
            >
              Tasks
            </button>
            <button
              onClick={() => handleTabClick("praxes")}
              className={`px-4 ${
                activeTab === "praxes" ? "font-bold" : "opacity-70"
              }`}
            >
              Praxes
            </button>
            <button
              onClick={() => handleTabClick("comments")}
              className={`px-4 ${
                activeTab === "comments" ? "bg-perse-300/50" : "opacity-70"
              }`}
            >
              Comments
            </button>
          </nav>
        </div>
      </div>
      <div className="flex flex-col items-center my-24 mx-6 md:mx-32 xl:mx-72">
        {/* Error */}
        {error && <Error message={error} setError={setError} />}
        {/* Loading */}
        {loading && (
          <div className="flex justify-center">
            <div
              className="mt-36 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-perse-50 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        )}
        {/* Dynamic Content Based on Active Tab */}
        {!loading && userData && (
          <>
            {activeTab === "profile" &&
              (isEditing ? (
                <UserProfileEdit
                  userData={userData}
                  setIsEditing={setIsEditing}
                  setLoading={setLoading}
                  setError={setError}
                  setShouldRefetch={setShouldRefetch}
                />
              ) : (
                <UserProfile userData={userData} setIsEditing={setIsEditing} />
              ))}
            {/* {activeTab === "tasks" && pageUserId && (
              <UserTasks
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
                userId={pageUserId}
              />
            )} */}
            {/* {activeTab === "praxes" && pageUserId && (
              <UserPraxes
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
                userId={pageUserId}
              />
            )} */}
            {/* {activeTab === "comments" && pageUserId && (
              <UserComments
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
                userId={pageUserId}
              />
            )} */}
          </>
        )}
      </div>
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
