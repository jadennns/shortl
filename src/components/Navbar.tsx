import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsFillMoonStarsFill, BsFillCloudSunFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { Store } from "react-notifications-component";

export default function Navbar() {
  const [light, setMode] = useState(true);
  const { theme, setTheme } = useTheme();

  const handleMode = () => {
    Store.addNotification({
      type: "info",
      message: "Dark mode is under development",
      container: "top-center",
    });

    // setTheme(theme == "dark" ? "light" : "dark");
    // setMode(light ? false : true);
  };

  const handleDropdown = () => {};

  return (
    <>
      <div className="flex justify-center items-center text-lg">
        <nav className="max-w-7xl drop-shadow-xl dark:drop-shadow-none lg:rounded-md flex justify-between p-4 mt-0 lg:mt-5 w-full lg:w-11/12 z-[1]">
          <div className="flex items-center">
            <Link href={"/"} passHref>
              <Image
                src={"/Logo.png"}
                alt="Logo"
                width={80}
                height={80}
                className="cursor-pointer"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-2 relative">
            <button
              className="rounded-full shadow-xl text-white bg-gray-800 dark:text-black dark:bg-gray-200 px-2 py-2 hover:scale-95"
              onClick={handleMode}
            >
              {light ? (
                <BsFillMoonStarsFill size={25} />
              ) : (
                <BsFillCloudSunFill size={25} />
              )}
            </button>
            <Link href={"/dashboard"}>
              <button
                className="rounded-full shadow-xl text-white bg-gray-800 dark:text-black dark:bg-gray-200 px-2 py-2 hover:scale-95"
                onClick={handleDropdown}
              >
                <AiOutlineUser size={25} />
              </button>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
