import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import barnOwl from "../../public/barnowl-trans.png";
import goldenEagle from "../../public/eagle.png";

const Message: React.FC<{ text: string }> = ({ text }) => {
  const { theme } = useTheme();

  return (
    <div className="flex mb-10">
      <div className="relative w-36 mr-2">
        <Image
          src={theme === "dark" ? barnOwl : goldenEagle}
          alt="watercolor barn owl"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex p-4 text-lg border-2 rounded-md bg-parchment-50 dark:bg-gray-700 dark:bg-opacity-50 bg-opacity-50 border-parchment-100 dark:border-gray-500">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Message;
