import { GetServerSideProps } from "next";
import { dbConnect } from "../../lib/mongodb";
import { withSessionSsr } from "../../lib/session";

export default function notFound() {
  return <>Invalid short link</>;
}

// @ts-expect-error
export const getServerSideProps: GetServerSideProps = async (req) => {
  const { slug } = req.query;

  const db = await dbConnect();
  const data = await db.collection("shortl_redirects").findOne({ name: slug });
  if (data)
    return {
      redirect: {
        destination: data.destination,
      },
    };

  return {
    props: {},
  };
};
