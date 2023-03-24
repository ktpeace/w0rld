import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen mt-20 px-6 py-8 gap-5 dark:text-dark">
      <h1 className="text-2xl">World Zero</h1>
      <p>
        Welcome to World Zero! This is a new work in progress, updated multiple
        times a week.
      </p>
      <p>
        Check back soon for improvements in pages that have some stuff, and
        stuff going into empty pages!
      </p>
    </main>
  );
}
