import { dbConnect } from "../../../lib/mongodb";
import { withSessionApi } from "../../../lib/session";

export default withSessionApi(async (req, res) => {
  if (req.method !== "POST")
    return res.status(400).send({ message: "Bad body request" });

  const db = await dbConnect();
  const { email, password } = JSON.parse(req.body);
  if (!email || !password)
    return res
      .status(400)
      .send({ message: "Bad body req", body: JSON.parse(req.body) });
  const isExist = await db
    .collection("shortl_users")
    .findOne({ email, password });
  if (!isExist) return res.status(404).send({ message: "Not found." });

  req.session.user = {
    email,
    username: isExist.username,
  };

  await req.session.save();
  res.status(200).send({ message: "OK" });
});
