import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";

type postProps = {
  id: number;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.body);
    const post: postProps = req.body;
    if (req.method === "DELETE") {
      try {
        console.log(req.body.postId);
        const data = await prisma.post.delete({
          where: {
            id: req.body.postId,
          },
        });
        res.status(200).json(data);
      } catch (e) {
        return res.status(500).json({ message: "Error Creating a new post" });
      }
    }
  } catch (error) {
    return res.status(500);
  }
}
