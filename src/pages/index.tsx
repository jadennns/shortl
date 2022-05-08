import Image from "next/image";
import Container from "../components/Container";
import Link from "next/link";
import { ShortlUser } from "../..";

interface Props {
  user?: ShortlUser;
}

export default function Home({ user }: Props) {
  return (
    <>
      <Container title="Home | Shortl" />
      <div className="flex items-center justify-center mt-20">
        <div className="flex flex-col items-center space-y-[10rem]">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-10">
              <Image
                src={"/tired.png"}
                alt="Tired Person"
                width={128}
                height={128}
              />
              <div className="flex flex-col items-start space-y-1">
                <p className="text-2xl text-gray-800 dark:text-gray-100 font-semibold">
                  Shortl
                </p>
                <p className="text-lg text-gray-500 dark:text-gray-300 w-[30rem]">
                  Tired because you keep forgetting the url? Well {"don't"}{" "}
                  worry because Shortl is here for you! We offer a free way to
                  solve your problem. You can create a custom url endpoint that
                  redirects to the URL you want to visit!
                </p>
              </div>
            </div>
            <Link href={user ? "/dashboard" : "/login"}>
              <button className="rounded-md bg-amber-400 hover:bg-amber-500 px-2 py-2 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white font-semibold">
                Get Started
              </button>
            </Link>
          </div>
          <br />
        </div>
      </div>
      <br />
      <br />
    </>
  );
}
