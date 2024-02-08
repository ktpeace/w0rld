import Link from "next/link";
import Image from "next/image";
import { Praxis } from "@/types";
import formatISODateString from "@/utils/formatDateTime";
// import groupIconMapper from "./GroupIcons";

type CardProps = {
  praxis: Praxis;
};

const PraxisCard = ({ praxis }: CardProps) => {
  console.log("praxis:", praxis);
  return (
    <Link
      href={`/praxes/${praxis.id}`}
      className={`w-full p-4 flex justify-between gap-4 cursor-pointer rounded-lg border border-transparent dark:text-parchment-100 bg-white dark:bg-perse-600 dark:border-perse-400 dark:hover:bg-perse-100 dark:hover:border-perse-300`}
    >
      {/* Image Desktop */}
      <div className="mx-auto max-w-48 hidden md:block">
        <Image
          src={
            praxis.imagePath ||
            "https://images.pexels.com/photos/47367/full-moon-moon-bright-sky-47367.jpeg"
          }
          alt={praxis.title}
          sizes="100vw"
          width={16}
          height={24}
          className="w-full h-auto rounded object-cover"
        />
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col">
          <div className="w-full flex justify-between items-center mb-4">
            <div className="w-full flex items-center gap-2">
              {/* Image Mobile */}
              <div className="max-w-12 block md:hidden">
                <Image
                  src={
                    praxis.imagePath ||
                    "https://images.pexels.com/photos/47367/full-moon-moon-bright-sky-47367.jpeg"
                  }
                  alt={praxis.title}
                  sizes="100vw"
                  width={16}
                  height={24}
                  className="w-full h-auto rounded object-cover"
                />
              </div>
              {/* Post Title */}
              <h2 className="text-lg font-bold">{praxis.title}</h2>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start sm:items-center mb-4">
            {/* Creator & Date */}
            <div className="w-full flex items-center justify-between lg:justify-start mb-4 lg:mb-0 text-sm">
              <span className="mr-2">
                <strong>{praxis.User.username}</strong> completed{" "}
                <strong>{praxis.Task.name}</strong> on{" "}
                {formatISODateString(praxis.completedAt)}
              </span>
            </div>
            <div className="w-full flex justify-end items-center gap-4">
              {/* Points */}
              <span
                className="font-bold text-gray-500 dark:text-parchment-300"
                title="Points for achieving this task"
              >
                {praxis.Task.points}P
              </span>
              {/* Level */}
              <div
                className={`px-2 flex items-center justify-center rounded-full border dark:border-parchment-300 dark:bg-parchment-300 dark:text-perse-700 font-bold text-sm text-white bg-gray-500`}
              >
                <span title="Task level">L{praxis.Task.level}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Description */}
        <div
          className={`w-full min-h-24 flex-grow bg-gray-100 dark:bg-perse-400 dark:border-perse-400 rounded-lg p-3 border border-gray-300`}
        >
          <p className="text-gray-700 dark:text-parchment-100 text-base line-clamp-3">
            {praxis.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PraxisCard;
