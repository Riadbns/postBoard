import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "DELETE") {
      try {
        console.log(req.body.postId);
        const data = await prisma.post.deleteMany({})
        res.status(200).json("all deleted");
      } catch (e) {
        return res.status(500).json({ message: "Error deleting all post" });
      }
    }
  } catch (error) {
    return res.status(500);
  }
}
