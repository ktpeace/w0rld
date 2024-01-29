import Link from "next/link";
import ThemeToggle from "@/context/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="p-4 flex items-center justify-between uppercase sm:text-xl dark:bg-perse-100 bg-parchment-200 gap-4">
      <div className="flex-1 hidden sm:block"></div>
      <ul className="flex justify-between flex-auto">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/tasks">Tasks</Link>
        </li>
        <li>
          <Link href="/praxis">Praxis</Link>
        </li>
        <li>
          <Link href="/groups">Groups</Link>
        </li>
      </ul>
      <ul className="flex justify-end flex-1 space-between sm:gap-2">
        <li className=" cursor-pointer" role="button">
          <Link href="/more">❔</Link>
        </li>
        <ThemeToggle />
        <li>👤</li>
      </ul>
    </nav>
  );
}
