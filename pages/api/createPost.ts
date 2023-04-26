import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";

type postProps = {
  title: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.body);
    const post: postProps = req.body;
    if (req.method === "POST") {
      //check for title
      if (!post.title.length) {
        return res
          .status(500)
          .json({ message: "please don't leave this empty" });
      }
      try {
        const data = await prisma.post.create({
          data: {
            title: post.title,
          },
        });
        console.log(data);
        res.status(200).json(data);
      } catch (e) {
        return res.status(500).json({ message: "Error Creating a new post" });
      }
    }
  } catch (error) {
    return res.status(500);
  }
}
