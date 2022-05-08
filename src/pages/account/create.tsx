import { useState } from "react";
import { Store } from "react-notifications-component";
import { ShortlUser } from "../../..";
import CreateQ from "../../components/account/CreateQ";
import Container from "../../components/Container";
import { withSessionSsr } from "../../lib/session";

interface Props {
  user: ShortlUser;
}

export default function CreateShort({ user }: Props) {
  const [url, setUrl] = useState<string>();
  const [name, setName] = useState<string>();
  const [isDisabled, setDisabled] = useState(false);

  function isValidHttpUrl(link: string) {
    let url: URL;

    try {
      url = new URL(link);
    } catch (_) {
      return false;
    }

    return url.protocol === "https:";
  }

  const handleCreate = () => {
    if (!name || !url)
      return Store.addNotification({
        type: "danger",
        message: "Please input a valid url or name",
        container: "top-center",
      });

    if (name.includes("/"))
      return Store.addNotification({
        type: "danger",
        message: 'name cannot include "/"',
        container: "top-center",
      });

    if (!isValidHttpUrl(url))
      return Store.addNotification({
        type: "danger",
        message: 'URL must have an "https" protocol',
        container: "top-center",
      });

    fetch("/api/account/add", {
      method: "POST",
      body: JSON.stringify({
        name,
        destination: url,
        email: user.email,
      }),
    }).then(async (response) => {
      if (response.status !== 200)
        return Store.addNotification({
          type: "danger",
          message: await response.json().then((data) => data.message),
          container: "top-center",
        });

      Store.addNotification({
        type: "success",
        message: "Successfully created short",
        container: "top-center",
      });

      setDisabled(true);

      setTimeout(() => {
        location.replace("/dashboard");
      }, 1500);
    });
  };

  return (
    <>
      <Container title="Create a short" />
      <div className="flex items-center justify-center mt-20">
        <div className="border border-amber-500 rounded-md h-fit px-3 py-4">
          <div className="flex flex-col items-start space-y-2">
            <h1 className="text-gray-900 font-semibold text-xl">
              Create a short
            </h1>
            <CreateQ
              dispatch={setUrl}
              placholder="https://www.google.com/"
              name="Website"
            />
            <CreateQ
              dispatch={setName}
              placholder="myshortredirect"
              name="Name"
            />
            <button
              className="bg-amber-400 hover:bg-amber-500 text-white px-2 py-2 rounded-md font-semibold disabled:cursor-not-allowed"
              onClick={handleCreate}
              disabled={isDisabled}
            >
              Create short
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = withSessionSsr(
  async function CreateShortRoute({ req }) {
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
  }
);
