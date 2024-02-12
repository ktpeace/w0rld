"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import ThemeToggle from "@/context/ThemeToggle";
import AvatarDropdown from "@/components/AvatarDropdown";
// import tanPaper from "../../public//torn-paper-2.png";

export default function Navbar() {
  const pathname = usePathname();
  const { user, setUser } = useUser();

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
      <nav className="relative w-full z-20 flex px-2 items-center justify-between uppercase sm:text-xl dark:bg-perse-600 bg-parchment-200 gap-4">
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
              href="/praxes"
              className={`${pathname === "/praxes" ? "underline" : ""}`}
            >
              Praxes
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
            {user ? (
              <AvatarDropdown />
            ) : (
              <Link href="/login">
                <span className="lowercase text-sm">Login</span>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
