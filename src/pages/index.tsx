import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex flex-col items-center mt-20 px-6 py-8 gap-5 dark:text-dark">
      <h1 className="text-2xl">World Zero</h1>
      <p>
        Welcome to World Zero! This is a new work in progress, updated multiple
        times a week.
      </p>
      <p>
        {" "}
        It is a revamping/revival of the old site{" "}
        <a href="http://sf0.org/" className="underline hover:font-bold">
          SF0
        </a>
        .
      </p>
    </main>
  );
}
