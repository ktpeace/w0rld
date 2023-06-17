import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-4 bg-slate-50 border-t-2 border-slate-100 dark:border-0 dark:bg-gray-800 dark:text-dark">
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
