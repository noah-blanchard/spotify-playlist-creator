import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.query.token;
  const url = "https://api.spotify.com/v1/me";
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // res.status(200).json({ name: token });
  res.status(200).json(await result.data);
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getHandler(req, res);
    default:
      return res.status(405).end();
  }
}
