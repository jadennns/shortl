import { dbConnect } from "../../../lib/mongodb";
import { withSessionApi } from "../../../lib/session";

export default withSessionApi(async (req, res) => {
  if (req.method !== "POST")
    return res.status(400).send({ message: "bad body request" });

  const { destination, email, name } =
    typeof req.body == "string" ? JSON.parse(req.body) : req.body;
  if (!destination || !email || !name)
    return res.status(400).send({ message: "Bad body request" });

  const db = await dbConnect();

  const data = await db.collection("shortl_created").findOne({ email });

  if (data) {
    const msBetweenDates = Math.abs(
      new Date(data.date).getTime() - new Date().getTime()
    );
    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
    if (hoursBetweenDates < 24)
      return res
        .status(401)
        .send({ message: "You can only create a short every 24 hours" });
  }

  const isExist = await db.collection("shortl_redirects").findOne({ name });
  if (isExist)
    return res
      .status(401)
      .send({ message: "A redirect already exist with that name" });

  await db
    .collection("shortl_redirects")
    .insertOne({ destination, email, name });

  (await db.collection("shortl_created").findOne({ email }))
    ? db.collection("shortl_created").updateOne({ email }, { date: new Date() })
    : db.collection("shortl_created").insertOne({ date: new Date(), email });

  res.status(200).send({ message: "OK" });
});
