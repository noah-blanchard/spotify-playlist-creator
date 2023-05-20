// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// get handler

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = new URLSearchParams();
  params.append("client_id", process.env.SPOTIFY_CLIENT_ID as string);
  params.append("response_type", "code");
  params.append("redirect_uri", process.env.SPOTIFY_REDIRECT_URI as string);
  params.append("scope", process.env.SCOPE as string);

  const url = `https://accounts.spotify.com/authorize?${params.toString()}`;

  // create a next response with a json containg url
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({ url });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getHandler(req, res);
    default:
      return res.status(405).end();
  }
}
