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
        Welcome to World Zero! This is work-in-progress is updated multiple
        times a week.
      </p>
      <p>
        It is a revamping/revival of the old site{" "}
        <a href="http://sf0.org/" className="underline hover:font-bold">
          SF0
        </a>
        .
      </p>
      {/* 💀 The dead site{" "}
        <a href="http://sf0.org/" className="underline hover:font-bold">
          SF0
        </a>{" "}
        was a collaborative real-world game. World Zero will both revive and
        expand upon what was lost.
      </p>
      <p>
        🪴Users could add tasks for anyone to complete to gain points. For
        example, “Leave a small potted plant in a store, café, or a location of
        your choosing.”
      </p>
      <h2 className="text-lg">Tech Stack</h2>
      <div className="flex flex-wrap wrap gap-1">
        <img
          src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"
          alt="NodeJS"
        />
        <img
          src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"
          alt="React"
        />
        <img
          src="https://img.shields.io/badge/Next.js-000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white"
          alt="Next.js"
        />
        <img
          src="https://img.shields.io/badge/Vercel-000000.svg?style=for-the-badge&logo=Vercel&logoColor=white"
          alt="Vercel"
        />
        <img
          src="https://img.shields.io/badge/Tailwind-06B6D4.svg?style=for-the-badge&logo=Tailwind&logoColor=white"
          alt="Tailwind"
        />
        <img
          src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"
          alt="TypeScript"
        />
        <img
          src="https://img.shields.io/badge/Jest-C21325.svg?style=for-the-badge&logo=Jest&logoColor=white"
          alt="Jest"
        />
        <img
          src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"
          alt="Express.js"
        />
        <img
          src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white"
          alt="MySQL"
        />
        <img
          src="https://img.shields.io/badge/Amazon%20AWS-232F3E.svg?style=for-the-badge&logo=Amazon-AWS&logoColor=white"
          alt="AWS"
        />
      </div> */}
    </main>
  );
}
