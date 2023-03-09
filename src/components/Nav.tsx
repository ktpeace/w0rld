import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { faTableList } from "@fortawesome/free-solid-svg-icons";
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";
import { faHandshakeAngle } from "@fortawesome/free-solid-svg-icons";
import { faChildReaching } from "@fortawesome/free-solid-svg-icons";
import pixie from "../../public/images/pixie-avatar.jpeg";

const Nav = () => {
  return (
    <nav className="dark:bg-gray-800 dark:text-dark p-2 fixed w-full z-10 top-0 text-base">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex items-center justify-between h-16">
          <div className="flex justify-start items-baseline">
            <Link href="/" className="flex flex-col items-center gap-1">
              <FontAwesomeIcon
                icon={faHouseChimney}
                className="w-8 md:w-13 dark:text-dark max-h-7 sm:max-h-15"
              />
              <span className="hidden md:inline-block">Home</span>
            </Link>
          </div>
          <div className="flex items-baseline gap-5 sm:gap-20">
            <Link href="/tasks" className="flex flex-col items-center gap-1">
              <FontAwesomeIcon
                icon={faTableList}
                className="w-8 md:w-13 dark:text-dark max-h-7 sm:max-h-8"
              />
              <span className="hidden md:inline-block">Tasks</span>
            </Link>
            <Link href="/praxis" className="flex flex-col items-center gap-1">
              <FontAwesomeIcon
                icon={faFireFlameCurved}
                className="w-8 md:w-13 dark:text-dark max-h-7 sm:max-h-15"
              />
              <span className="hidden md:inline-block">Praxis</span>
            </Link>
            <Link href="/groups" className="flex flex-col items-center gap-1">
              <FontAwesomeIcon
                icon={faHandshakeAngle}
                className="w-8 md:w-13 dark:text-dark max-h-7 sm:max-h-15"
              />
              <span className="hidden md:inline-block">Groups</span>
            </Link>
            <Link href="/players" className="flex flex-col items-center gap-1">
              <FontAwesomeIcon
                icon={faChildReaching}
                className="w-8 md:w-13 dark:text-dark max-h-7 sm:max-h-8"
              />
              <span className="hidden md:inline-block">Players</span>
            </Link>
          </div>
          <div className="justify-self-end flex items-center space-x-2 md:space-x-4">
            <Link href="/profile">
              <Image
                src={pixie}
                alt="my avatar"
                className="rounded-full object-cover w-12 md:w-16"
              ></Image>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
