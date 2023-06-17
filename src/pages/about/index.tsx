import Link from "next/link";

const About = () => {
  return (
    <main className="flex flex-col items-center mt-20 px-6 py-8 gap-5 dark:text-dark">
      <h1 className="text-2xl">About</h1>
      <p>
        World Zero is a revival and revamping of the old real-world game site{" "}
        <Link href="http://sf0.org/">SF0</Link>.
      </p>
    </main>
  );
};

export default About;
