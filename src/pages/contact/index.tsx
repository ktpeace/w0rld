import Link from "next/link";

const Contact = () => {
  return (
    <main className="flex flex-col items-center mt-20 px-6 py-8 gap-5 dark:text-dark">
      <h1 className="text-2xl">Contact</h1>
      <p>
        Contact me through{" "}
        <Link href="https://github.com/ktpeace/" className="underline">
          my GitHub
        </Link>{" "}
        for now.
      </p>
    </main>
  );
};

export default Contact;
