import { dbConnect } from "../../../lib/mongodb";
import { withSessionApi } from "../../../lib/session";

export default withSessionApi(async (req, res) => {
  const { email, password, username } = JSON.parse(req.body);
  if (!email || !password || !username)
    return res.status(400).send({ message: "Bad body request" });

  const db = await dbConnect();
  const isExist = await db.collection("shortl_users").findOne({ email });
  if (isExist)
    return res
      .status(401)
      .send({ message: "A account already exist with that email" });
  else {
    await db
      .collection("shortl_users")
      .insertOne({ email, password, username });

    req.session.user = {
      username,
      email,
    };

    await req.session.save();

    res.status(200).send({ message: "OK" });
  }
});
