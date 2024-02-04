"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/context/ThemeToggle";
import avatarPin from "../../public/pin-full.png";
// import tanPaper from "../../public//torn-paper-2.png";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  console.log("pathname:", pathname);

  return (
    <div className="relative w-full">
      {/* <div className="absolute top-0 left-0 right-0 h-[calc(100%+75px)] z-10 mr-4">
        <Image
          src={tanPaper}
          alt="Faded paper (navbar decoration)"
          fill
          className="bottom-0 left-0 right-0 object-cover object-bottom"
        />
      </div> */}
      <nav className="relative w-full z-20 flex px-2 items-center justify-between uppercase sm:text-xl dark:bg-perse-100 bg-parchment-200 gap-4">
        <div className="flex-1 hidden sm:block"></div>
        <ul className="p-4 flex justify-between flex-auto">
          <li>
            <Link href="/" className={`${pathname === "/" ? "underline" : ""}`}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/tasks"
              className={`${pathname === "/tasks" ? "underline" : ""}`}
            >
              Tasks
            </Link>
          </li>
          <li>
            <Link
              href="/praxis"
              className={`${pathname === "/praxis" ? "underline" : ""}`}
            >
              Praxis
            </Link>
          </li>
          <li>
            <Link
              href="/groups"
              className={`${pathname === "/groups" ? "underline" : ""}`}
            >
              Groups
            </Link>
          </li>
        </ul>
        <ul className="p-1 flex justify-end items-center flex-1 space-between sm:gap-2">
          <li className=" cursor-pointer" role="button">
            <Link href="/more">❔</Link>
          </li>
          <ThemeToggle />
          <li>
            <Link href="/user">
              <Image
                src={avatarPin}
                alt="Antique pin representing user avatar"
                width="40"
                height="40"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
