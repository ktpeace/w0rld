import dummyGroups from "@/api/dummyGroups";
import Image from "next/image";
import Link from "next/link";
import acorns from "../../../public/acorns.png";
import mushrooms from "../../../public/mushrooms-ghost.png";
import barnOwl from "../../../public/barnowl-trans.png";
import groupsBg from "../../../public/gptgroups.webp";
import { AcademicCapIcon } from "@heroicons/react/24/solid";

export default function GroupsPage() {
  return (
    <main className="flex flex-col items-center mt-24 mx-6 md:mx-24 xl:mx-64">
      {/* Side images */}
      <div className="absolute z-10 w-60 h-60 top-96 right-4 overflow-hidden">
        <Image
          src={acorns}
          alt="Watercolor acorns (decorative)"
          quality={100}
          fill
          className="object-contain rotate-200"
        />
      </div>
      {/* Background image */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
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
            src={barnOwl}
            alt="watercolor barn owl"
            fill
            objectFit="contain"
          />
        </div>
        <div className="flex p-4 text-lg border-2 rounded-md bg-parchment-50 dark:bg-teal-200 dark:bg-opacity-50 bg-opacity-50 border-parchment-100 dark:border-teal-100 ">
          <p>
            “Groups represent certain ideologies and confer different benefits.
            Consider your group carefully, but know that you can always change
            your choice.”
          </p>
        </div>
      </div>
      {/* Group cards */}
      <section className="w-full flex flex-wrap items-center justify-between gap-y-10">
        {dummyGroups.map((group) => (
          <Link
            href={`/groups/${group.id}`}
            key={group.id}
            className="p-4 self-stretch flex flex-col gap-4 cursor-pointer border border-transparent dark:text-parchment-100 bg-white dark:bg-perse-100 hover:border-gray-400 dark:border-perse-50 dark:hover:bg-perse-400"
            style={{ width: "48%" }}
          >
            {/* Icon & Name */}
            <div className="flex">
              <AcademicCapIcon className="h-8 w-8 mr-3 text-gray-500 dark:text-parchment-300" />
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
