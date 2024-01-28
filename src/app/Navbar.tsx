import Link from "next/link";
import ThemeToggle from "@/context/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="p-4 flex items-center justify-between uppercase font-semibold dark:bg-perse-100 bg-parchment-200">
      <div className="flex-1"></div>
      <ul className="flex justify-center flex-auto">
        <li className="mx-8">
          <Link href="/">Home</Link>
        </li>
        <li className="mx-8">
          <Link href="/tasks">Tasks</Link>
        </li>
        <li className="mx-8">
          <Link href="/praxis">Praxis</Link>
        </li>
        <li className="mx-8">
          <Link href="/groups">Groups</Link>
        </li>
      </ul>
      <ul className="flex justify-end flex-1">
        <li className="mx-2 cursor-pointer" role="button">
          <Link href="/more">❔</Link>
        </li>
        <ThemeToggle />
        <li className="mx-2">👤</li>
      </ul>
    </nav>
  );
}
