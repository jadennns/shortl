import { useEffect, useState } from "react";
import { ShortlRedirect, ShortlUser } from "../..";
import Container from "../components/Container";
import { withSessionSsr } from "../lib/session";
import { MdOutlineContentCopy } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";

interface Props {
  user: ShortlUser;
}

export default function Dashboard({ user }: Props) {
  const [data, setData] = useState<ShortlRedirect[]>([]);
  const [scale, setScale] = useState("");

  useEffect(() => {
    fetch("/api/account/list", {
      method: "GET",
    })
      .then((response) => response.json())
      .then(setData);
  }, []);

  return (
    <>
      <Container title="Dashboard" />
      <div className="flex flex-col space-y-10 items-center justify-center mt-20">
        <h1 className="text-4xl font-semibold">{user.username} Redirects</h1>
        <Link href={"/account/create"}>
          <div className="rounded-full bg-gray-600 hover:bg-gray-700 cursor-pointer  text-white">
            <FiPlus size={32} />
          </div>
        </Link>
        <div className="h-fit flex flex-col space-y-2 py-3 px-3 w-[50rem] bg-gray-100 rounded-md">
          {data.map((redirect, index) => (
            <div
              className="bg-gray-200 rounded-md w-[45rem] h-fit px-1 py-1 flex items-center justify-between"
              key={index + 1}
            >
              <div className="flex flex-col items-start px-2">
                <div className="flex items-center space-x-2">
                  <Link href={"/short/" + redirect.name}>
                    <p className="text-lg text-blue-600 hover:text-blue-700 hover:underline cursor-pointer font-semibold">
                      /short/{redirect.name}
                    </p>
                  </Link>
                  <MdOutlineContentCopy
                    className={`cursor-pointer ${scale}`}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.origin}/short/${redirect.name}`
                      );
                      setScale("scale-[0.8]");
                      setTimeout(() => setScale(""), 1000);
                    }}
                  />
                </div>
                <Link href={redirect.destination}>
                  <p className="text-base text-gray-600 hover:underline cursor-pointer">
                    {redirect.destination}
                  </p>
                </Link>
              </div>
              <div className="flex items-center space-x-1 px-2">
                <AiFillEdit
                  className="bg-amber-400 hover:bg-amber-500 cursor-pointer text-white rounded-full px-1 py"
                  size={32}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = withSessionSsr(async function DashboardRoute({
  req,
}) {
  const { user } = req.session;
  if (!user)
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };

  return {
    props: { user },
  };
});
