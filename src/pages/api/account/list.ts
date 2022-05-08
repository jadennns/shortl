import { dbConnect } from "../../../lib/mongodb";
import { withSessionApi } from "../../../lib/session";

export default withSessionApi(async (req, res) => {
  if (req.method !== "GET")
    return res.status(400).send({ message: "Bad body request" });
  const db = await dbConnect();
  const dataToSend = await db
    .collection("shortl_redirects")
    .find({ email: req.session.user?.email })
    .toArray();
  res.status(200).send(dataToSend);
});
