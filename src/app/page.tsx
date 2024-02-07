import Image from "next/image";
import worldBg from "../../public/worldw0rld.webp";

export default function Home() {
  const isUser = false;
  return (
    <main className="h-full flex flex-col items-center my-24 mx-3 md:mx-64">
      {/* Background image */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <Image
          src={worldBg}
          alt="Background image of fantasy world"
          quality={100}
          fill
          sizes="100vw"
          className="opacity-30 object-cover"
        />
      </div>
      {/* Signup box if no signed in user */}
      {!isUser && (
        <section className="mb-6 flex flex-col p-6 justify-between rounded bg-gradient-to-r from-[rgba(0,151,178,0.6)] via-[rgba(82,140,65,0.6)] to-[rgba(82,140,65,0.6)]">
          <div className="text-white text-xl font-medium">
            <p className="mb-4">
              <strong>
                W<span className="text-2xl">O</span>RLD ZER
                <span className="text-2xl">O</span>
              </strong>{" "}
              is a free game played worldwide by doing tasks in real life and
              sharing them with fellow players for points and glory.
            </p>
            <p className="text-xl">Begin your journey?</p>
          </div>
          <div className="flex justify-end items-end">
            <button
              type="submit"
              className="px-5 py-1 rounded-full bg-teal-500 hover:bg-teal-400 focus:ring-4 focus:outline-none focus:ring-teal-300 text-white  text-center text-xl font-semibold uppercase"
            >
              Sign Up
            </button>
          </div>
        </section>
      )}
      {/* Updates */}
    </main>
  );
}
