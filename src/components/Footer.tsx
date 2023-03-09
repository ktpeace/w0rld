import Link from "next/link";

const Footer = () => {
  return (
    <footer className="dark:bg-gray-800 dark:text-dark py-4">
      <ul className="flex justify-around">
        <Link href="/about">
          <li>About</li>
        </Link>
        <Link href="/contact">
          <li>Contact</li>
        </Link>
        <Link href="/credits">
          <li>Credits</li>
        </Link>
        <Link href="/donate">
          <li>Donate</li>
        </Link>
      </ul>
    </footer>
  );
};

export default Footer;
