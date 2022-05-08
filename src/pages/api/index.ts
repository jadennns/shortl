import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) =>
  res.status(200).send({ message: "API is up and running" });

export default handler;
