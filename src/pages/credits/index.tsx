import Link from "next/link";

const Credits = () => {
  return (
    <main className="flex flex-col items-center min-h-screen mt-20 px-6 py-8 gap-5 dark:text-dark">
      <h1 className="text-2xl">Credits</h1>
      <h2 className="text-xl">Icons</h2>
      <ul>
        <li>
          <Link
            href="https://www.flaticon.com/free-icons/lantern"
            title="lantern icons"
            className="underline"
          >
            Lantern icon by Freepik - Flaticon
          </Link>
        </li>
        <li>
          <Link
            href="https://fontawesome.com/"
            title="nav icons"
            className="underline"
          >
            Font Awesome (Nav Icons)
          </Link>
        </li>
      </ul>
    </main>
  );
};

export default Credits;
