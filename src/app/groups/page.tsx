"use client";
import { ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useTheme } from "@/context/ThemeContext";
import {
  AcademicCapIcon,
  MapIcon,
  PaintBrushIcon,
  PaperAirplaneIcon,
  PhotoIcon,
  ScaleIcon,
} from "@heroicons/react/24/solid";
import { Group } from "@/types";
import acorns from "../../../public/acorns.png";
import mushrooms from "../../../public/mushrooms-ghost.png";
import barnOwl from "../../../public/barnowl-trans.png";
import goldenEagle from "../../../public/eagle.png";
import groupsBg from "../../../public/gptgroups.webp";
import Error from "@/components/Error";

// Map icons to group IDs
interface IconMapper {
  [key: number]: ReactElement | undefined;
}

const iconClass = "h-8 w-8 mr-3 text-gray-500 dark:text-parchment-300";

const iconMapper: IconMapper = {
  1: <PaintBrushIcon key="1" className={iconClass} />, // University of Aesthematics
  2: <AcademicCapIcon key="2" className={iconClass} />, // UA Masters Course
  3: <PaperAirplaneIcon key="3" className={iconClass} />, // S.N.I.D.E.
  4: <MapIcon key="4" className={iconClass} />, // Journeymen
  5: <PhotoIcon key="5" className={iconClass} />, // Analog
  6: <ScaleIcon key="6" className={iconClass} />, // Gestalt
};

// When rendering
// {groups.map((group) => (
//   <div key={group.id}>
//     {iconMapping[group.id]}
//     <p>{group.name}</p>
//   </div>
// ))}

export default function GroupsPage() {
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  // Fetch & set groups
  const fetchGroups = async () => {
    setError("");
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups`
      );
      setGroups(data);
    } catch (error) {
      console.error("Failed to fetch groups:", error);
      setError("Sorry, an error occurred fetching the groups! Please reload.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center mt-24 mx-6 md:mx-24 xl:mx-64">
      {/* Side images */}
      <div className="absolute z-[-10] xl:z-10 w-60 h-60 top-96 right-4 overflow-hidden opacity-20 xl:opacity-100">
        <Image
          src={acorns}
          alt="Watercolor acorns (decorative)"
          quality={100}
          fill
          className="object-contain rotate-200"
        />
      </div>
      {/* Background image */}
      <div className="absolute inset-0 z-[-5] overflow-hidden">
        <Image
          src={groupsBg}
          alt="Background image of fantasy-style characters"
          quality={100}
          fill
          sizes="100vw"
          className="opacity-10 object-cover"
        />
      </div>
      {/* Groups explanation */}
      <div className="flex mb-10">
        <div className="relative w-36 mr-2">
          <Image
            src={theme === "dark" ? barnOwl : goldenEagle}
            alt="watercolor barn owl"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex p-4 text-lg border-2 rounded-md bg-parchment-50 dark:bg-gray-700 dark:bg-opacity-50 bg-opacity-50 border-parchment-100 dark:border-gray-500">
          <p>
            “Groups represent certain ideologies and confer different benefits.
            Consider your group carefully, but know that you can always change
            your choice.”
          </p>
        </div>
      </div>
      {/* Error */}
      {error && <Error message={error} />}
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
      {/* Group cards */}
      {!loading && groups && (
        <section className="w-full flex flex-wrap items-center justify-between gap-y-10">
          {groups.map((group) => (
            <Link
              href={`/groups/${group.id}`}
              key={group.id}
              className="w-full md:w-12/25 p-4 self-stretch flex flex-col gap-4 cursor-pointer border border-transparent dark:text-parchment-100 bg-white dark:bg-perse-100 hover:border-gray-400 dark:border-perse-50 dark:hover:bg-perse-400"
            >
              {/* Icon & Name */}
              <div className="flex">
                {iconMapper[group.id]}
                {/* <AcademicCapIcon className="h-8 w-8 mr-3 text-gray-500 dark:text-parchment-300" /> */}
                <p className="font-bold text-lg">{group.name}</p>
              </div>
              {/* Stats */}
              <div className="flex">
                <p title="Member count" className="font-bold">
                  {group.memberCount} 人
                </p>
              </div>
              {/* Description */}
              <div className="w-full flex-grow bg-gray-100 dark:bg-perse-200 p-3 border border-gray-300 dark:border-perse-50">
                <p className="text-gray-700 dark:text-parchment-100 text-base line-clamp-5">
                  {group.description}
                </p>
              </div>
            </Link>
          ))}
        </section>
      )}
      {/* Bottom Image(s) */}
      <div className="flex relative mt-20 w-60 h-60 overflow-hidden">
        <Image
          src={mushrooms}
          alt="Watercolor ghost pipes mushrooms (decorative)"
          quality={100}
          fill
          className="object-contain"
        />
      </div>
    </main>
  );
}
