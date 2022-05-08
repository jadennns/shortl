import Container from "../components/Container";
import {
  HTMLInputTypeAttribute,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { Store } from "react-notifications-component";
import Link from "next/link";
import { withSessionSsr } from "../lib/session";

export default function LoginPage() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleLogin = () => {
    fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(async (res) => {
      if (res.status !== 200)
        return Store.addNotification({
          type: "danger",
          message: "Invalid email or password",
          container: "top-center",
        });
      else {
        Store.addNotification({
          type: "success",
          message: "Successfully authenticated your account",
          container: "top-center",
        });

        setTimeout(() => {
          location.replace("/dashboard");
        }, 2500);
      }
    });
  };

  return (
    <>
      <Container title="Login | Shortl" />
      <div className="flex items-center justify-center mt-20">
        <div className="rounded-md bg-gray-100 w-[25rem] px-4 py-4">
          <div className="flex flex-col items-start space-y-4">
            <Question dispatch={setEmail} name="Email" type="text" />
            <Question dispatch={setPassword} name="Password" type="password" />
            <button
              className="bg-amber-400 hover:bg-amber-500 rounded-md px-3 py-1 text-white font-semibold"
              onClick={handleLogin}
            >
              Login
            </button>
            <Link href={"/signup"}>
              <p className="cursor-pointer text-gray-600 font-semibold hover:underline">
                {"Don't have an acccount? Create one now!"}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

interface QuestionProps {
  dispatch: Dispatch<SetStateAction<any>>;
  type: HTMLInputTypeAttribute;
  name: string;
}

function Question({ dispatch, type, name }: QuestionProps) {
  return (
    <>
      <div className="flex flex-col items-start space-y-1">
        <p className="text-black text-lg font-semibold">{name}</p>
        <input
          type={type}
          onChange={(e) => dispatch(e.target.value)}
          className="outline-none border border-gray-900 px-1 py-1 rounded-md text-base w-[20rem]"
        />
      </div>
    </>
  );
}

export const getServerSideProps = withSessionSsr(async function LoginRoute({
  req,
}) {
  const { user } = req.session;
  if (user)
    return {
      redirect: {
        destination: "/dashboard",
        permanent: true,
      },
    };

  return {
    props: {},
  };
});
